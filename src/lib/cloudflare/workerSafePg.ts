import { EventEmitter } from 'node:events'
import pg from 'pg'

type PgModule = typeof pg
type PoolConfig = ConstructorParameters<PgModule['Pool']>[0]
type WorkerSafeClient = pg.Client & {
  release: () => Promise<void>
}

class WorkerSafePool extends EventEmitter {
  options: PoolConfig

  constructor(options: PoolConfig) {
    super()
    this.options = options
  }

  async connect(): Promise<WorkerSafeClient> {
    const client = new pg.Client(this.options)

    await client.connect()

    const release = async () => {
      client.removeAllListeners('error')
      await client.end()
    }

    Object.assign(client, {
      release,
    })

    return client as unknown as WorkerSafeClient
  }

  async end() {
    return undefined
  }

  async query(...args: Parameters<pg.Client['query']>) {
    const client = await this.connect()

    try {
      return await client.query(...args)
    } finally {
      await client.release()
    }
  }
}

export const workerSafePg: PgModule = {
  ...pg,
  Pool: WorkerSafePool as unknown as PgModule['Pool'],
}
