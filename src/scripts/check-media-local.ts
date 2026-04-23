import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { getPayload } from 'payload'
import config from '../payload.config'

async function checkMedia() {
  const payload = await getPayload({ config })
  const media = await payload.find({
    collection: 'media',
    limit: 100,
  })
  
  console.log(`Found ${media.totalDocs} media items in CMS.`)
  media.docs.forEach(doc => {
    console.log(`- ${doc.filename}`)
  })
  process.exit(0)
}

checkMedia().catch(console.error)
