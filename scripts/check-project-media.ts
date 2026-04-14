import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

import { getPayload } from 'payload'
import config from '../src/payload.config'

async function checkProjectMedia() {
  const payload = await getPayload({ config })
  const projects = await payload.find({
    collection: 'projects',
    limit: 100,
  })
  
  console.log(`Found ${projects.docs.length} projects.`);
  projects.docs.forEach(p => {
    console.log(`- Project: ${p.slug}, Title: ${p.title}, Media: ${p.thumbnail ? (typeof p.thumbnail === 'object' ? p.thumbnail.filename : p.thumbnail) : 'None'}`);
  });
}

checkProjectMedia().catch(console.error).then(() => process.exit(0))
