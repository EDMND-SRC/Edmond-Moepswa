import { resolveSmokeCredentials, getPayloadClient } from './lib/cloudflare-smoke'

async function ensureSmokeUser() {
  const credentials = resolveSmokeCredentials()
  const payload = await getPayloadClient()
  try {
    const existing = await payload.find({
      collection: 'users',
      depth: 0,
      limit: 1,
      where: {
        email: {
          equals: credentials.email,
        },
      },
    })

    if (existing.docs[0]) {
      await payload.update({
        collection: 'users',
        data: {
          name: credentials.name,
          password: credentials.password,
          roles: ['admin'],
        },
        id: existing.docs[0].id,
      })
      console.log(`Updated smoke user ${credentials.email}`)
      return
    }

    await payload.create({
      collection: 'users',
      data: {
        email: credentials.email,
        name: credentials.name,
        password: credentials.password,
        roles: ['admin'],
      },
    })

    console.log(`Created smoke user ${credentials.email}`)
  } finally {
    await payload.destroy?.()
  }
}

ensureSmokeUser()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
