import dotenv from 'dotenv'
import { getPayload } from 'payload'
import type { User } from '../../src/payload-types'

dotenv.config({ path: '.env' })
dotenv.config({ override: true, path: '.env.local' })

export const testUser: Pick<User, 'email' | 'name' | 'roles'> & { password: string } = {
  email: 'dev@payloadcms.com',
  name: 'Cloudflare Local Smoke User',
  password: 'test',
  roles: ['admin' as const],
}

/**
 * Seeds a test user for e2e admin tests.
 */
export async function seedTestUser(): Promise<void> {
  const { default: config } = await import('../../src/payload.config')
  const payload = await getPayload({ config })

  // Delete existing test user if any
  await payload.delete({
    collection: 'users',
    where: {
      email: {
        equals: testUser.email,
      },
    },
  })

  // Create fresh test user
  await payload.create({
    collection: 'users',
    draft: true,
    data: testUser,
  })
}

/**
 * Cleans up test user after tests
 */
export async function cleanupTestUser(): Promise<void> {
  const { default: config } = await import('../../src/payload.config')
  const payload = await getPayload({ config })

  await payload.delete({
    collection: 'users',
    where: {
      email: {
        equals: testUser.email,
      },
    },
  })
}
