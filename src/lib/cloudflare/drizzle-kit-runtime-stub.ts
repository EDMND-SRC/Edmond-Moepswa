const notAvailable = (): never => {
  throw new Error('drizzle-kit is not available in the Cloudflare worker runtime')
}

export const generateDrizzleJson = notAvailable
export const generateMigration = notAvailable
export const pushSchema = notAvailable
export const upPgSnapshot = notAvailable
