import pg from 'pg'

export type PostgresClient = pg.Client

function getConnectionString() {
  const connectionString = process.env.DATABASE_URL?.trim()

  if (!connectionString) {
    throw new Error('DATABASE_URL is not configured')
  }

  return connectionString
}

export async function withPostgresClient<T>(
  run: (client: PostgresClient) => Promise<T>,
): Promise<T> {
  const client = new pg.Client({
    connectionString: getConnectionString(),
  })

  await client.connect()

  try {
    return await run(client)
  } finally {
    await client.end().catch(() => undefined)
  }
}
