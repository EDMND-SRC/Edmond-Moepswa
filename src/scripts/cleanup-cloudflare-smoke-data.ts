import { getPayloadClient, readSmokeArtifacts, writeSmokeArtifacts } from './lib/cloudflare-smoke'

async function cleanupSmokeArtifacts() {
  const payload = await getPayloadClient()
  try {
    const artifacts = readSmokeArtifacts()

    for (const pageId of artifacts.pageIds) {
      try {
        await payload.delete({
          collection: 'pages',
          id: pageId,
        })
      } catch (error) {
        console.warn(`Unable to delete smoke page ${pageId}:`, error)
      }
    }

    for (const mediaId of artifacts.mediaIds) {
      try {
        await payload.delete({
          collection: 'media',
          id: mediaId,
        })
      } catch (error) {
        console.warn(`Unable to delete smoke media ${mediaId}:`, error)
      }
    }

    writeSmokeArtifacts({
      mediaIds: [],
      pageIds: [],
    })
  } finally {
    await payload.destroy?.()
  }
}

cleanupSmokeArtifacts()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
