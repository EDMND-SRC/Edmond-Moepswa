import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load env vars BEFORE importing config
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

import { getPayload } from 'payload'
import config from '../src/payload.config'

async function checkMedia() {
  const payload = await getPayload({ config })
  const media = await payload.find({
    collection: 'media',
    limit: 100,
  })
  
  console.log(`Found ${media.docs.length} media items in CMS.`);
  if (media.docs.length > 0) {
    media.docs.forEach(m => {
       console.log(`- ${m.filename} (ID: ${m.id})`);
    });
  }
}

checkMedia().catch(console.error).then(() => process.exit(0))
