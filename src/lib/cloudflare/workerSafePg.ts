import { EventEmitter } from 'node:events'
import pg from 'pg'

type PgModule = typeof pg
type PoolConfig = ConstructorParameters<PgModule['Pool']>[0]
type WorkerSafeClient = pg.Client & {
  release: (destroy?: boolean) => Promise<void>
}

const connectionErrorCodes = new Set(['ECONNRESET', 'EPIPE', 'ETIMEDOUT', '57P01', '57P02', '57P03'])

let sharedClient: pg.Client | null = null
let sharedClientConnectPromise: Promise<pg.Client> | null = null
let sharedClientKey: string | null = null
let clientLockChain = Promise.resolve()

function getPoolKey(options: PoolConfig) {
  return JSON.stringify(options)
}

function isConnectionError(error: unknown) {
  if (!error || typeof error !== 'object' || !('code' in error)) {
    return false
  }

  const code = String(error.code)

  return code.startsWith('08') || connectionErrorCodes.has(code)
}

async function resetSharedClient(client?: pg.Client | null) {
  if (!sharedClient || (client && sharedClient !== client)) {
    return
  }

  const staleClient = sharedClient

  sharedClient = null
  sharedClientConnectPromise = null
  sharedClientKey = null

  staleClient.removeAllListeners('error')

  try {
    await staleClient.end()
  } catch {
    // Ignore shutdown errors and allow the next request to recreate the client.
  }
}

async function getSharedClient(options: PoolConfig) {
  const clientKey = getPoolKey(options)

  if (sharedClient && sharedClientKey === clientKey) {
    return sharedClientConnectPromise ?? Promise.resolve(sharedClient)
  }

  if (sharedClient && sharedClientKey !== clientKey) {
    await resetSharedClient(sharedClient)
  }

  const client = new pg.Client(options)
  const connectPromise = client.connect().then(() => client)

  client.on('error', () => {
    void resetSharedClient(client)
  })

  sharedClient = client
  sharedClientConnectPromise = connectPromise
  sharedClientKey = clientKey

  try {
    return await connectPromise
  } catch (error) {
    if (isConnectionError(error)) {
      await resetSharedClient(client)
    }

    throw error
  }
}

async function queueQuery<Result>(callback: () => Promise<Result>) {
  let releaseLock: () => void = () => {}
  const previousLock = clientLockChain

  clientLockChain = new Promise<void>((resolve) => {
    releaseLock = resolve
  })

  await previousLock

  try {
    return await callback()
  } finally {
    releaseLock()
  }
}

function getQueryText(input: Parameters<pg.Client['query']>[0]) {
  if (typeof input === 'string') {
    return input
  }

  const text =
    input && typeof input === 'object' && 'text' in input ? (input as { text?: unknown }).text : undefined

  if (typeof text === 'string') {
    return text
  }

  return ''
}

function startsTransaction(queryText: string) {
  return /^\s*(begin|start\s+transaction)\b/i.test(queryText)
}

function endsTransaction(queryText: string) {
  return /^\s*(commit|rollback)\b/i.test(queryText)
}

function createWorkerSafeClient(client: pg.Client): WorkerSafeClient {
  let releaseTransactionLock: (() => void) | null = null

  const unlockTransaction = () => {
    if (!releaseTransactionLock) {
      return
    }

    const releaseLock = releaseTransactionLock
    releaseTransactionLock = null
    releaseLock()
  }

  const runClientQuery = async (...args: Parameters<pg.Client['query']>) => {
    const queryText = getQueryText(args[0])
    const beginsTransaction = !releaseTransactionLock && startsTransaction(queryText)
    const finishesTransaction = !!releaseTransactionLock && endsTransaction(queryText)

    if (beginsTransaction) {
      releaseTransactionLock = await (async () => {
        let releaseLock: () => void = () => {}
        const previousLock = clientLockChain

        clientLockChain = new Promise<void>((resolve) => {
          releaseLock = resolve
        })

        await previousLock
        return releaseLock
      })()

      try {
        return await client.query(...args)
      } catch (error) {
        unlockTransaction()

        if (isConnectionError(error)) {
          await resetSharedClient(client)
        }

        throw error
      }
    }

    if (releaseTransactionLock) {
      try {
        return await client.query(...args)
      } catch (error) {
        if (isConnectionError(error)) {
          unlockTransaction()
          await resetSharedClient(client)
        }

        throw error
      } finally {
        if (finishesTransaction) {
          unlockTransaction()
        }
      }
    }

    return queueQuery(async () => {
      try {
        return await client.query(...args)
      } catch (error) {
        if (isConnectionError(error)) {
          await resetSharedClient(client)
        }

        throw error
      }
    })
  }

  return new Proxy(client as WorkerSafeClient, {
    get(target, prop, receiver) {
      if (prop === 'query') {
        return runClientQuery
      }

      if (prop === 'release') {
        return async (destroy?: boolean) => {
          unlockTransaction()

          if (destroy) {
            await resetSharedClient(client)
          }
        }
      }

      const value = Reflect.get(target, prop, receiver)

      return typeof value === 'function' ? value.bind(target) : value
    },
  })
}

class WorkerSafePool extends EventEmitter {
  options: PoolConfig

  constructor(options: PoolConfig) {
    super()
    this.options = options
  }

  async connect(): Promise<WorkerSafeClient> {
    const client = await getSharedClient(this.options)

    return createWorkerSafeClient(client)
  }

  async end() {
    await resetSharedClient(sharedClient)
  }

  async query(...args: Parameters<pg.Client['query']>) {
    const client = await this.connect()
    return client.query(...args)
  }
}

export const workerSafePg: PgModule = {
  ...pg,
  Pool: WorkerSafePool as unknown as PgModule['Pool'],
}
