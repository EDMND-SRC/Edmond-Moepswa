import { testUser } from './seedUser'

export function shouldUseSmokeUser() {
  return process.env.E2E_USE_SMOKE_USER === '1'
}

export function resolveAdminUser() {
  if (!shouldUseSmokeUser()) {
    return testUser
  }

  const email = process.env.SMOKE_ADMIN_EMAIL || process.env.PAYLOAD_ADMIN_EMAIL
  const password = process.env.SMOKE_ADMIN_PASSWORD || process.env.PAYLOAD_ADMIN_PASSWORD

  if (!email || !password) {
    throw new Error('Missing SMOKE_ADMIN_EMAIL/SMOKE_ADMIN_PASSWORD for smoke-user E2E runs')
  }

  return {
    email,
    password,
  }
}
