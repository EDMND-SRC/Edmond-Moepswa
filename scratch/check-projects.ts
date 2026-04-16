import { getPayload } from 'payload'
import config from '../src/payload.config'

async function checkProjects() {
  // Hardcoded for verification as requested
  process.env.DATABASE_URL = 'postgresql://neondb_owner:npg_46WHJTcpktKL@ep-small-glitter-amcdw5uv-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
  process.env.PAYLOAD_SECRET = 'e978560dd0d6b82ce5d942ab'
  
  try {
    const payload = await getPayload({ config })
    const projects = await payload.find({
      collection: 'projects',
      depth: 1,
      limit: 10,
    })
    
    const formatted = projects.docs.map(p => ({
      id: p.id,
      title: p.title,
      thumbnail: p.thumbnail,
      thumbnailUrl: (typeof p.thumbnail === 'object' && p.thumbnail !== null) ? (p.thumbnail as any).url : p.thumbnail
    }))

    console.log('PROJECTS_DATA_START')
    console.log(JSON.stringify(formatted, null, 2))
    console.log('PROJECTS_DATA_END')
  } catch (error) {
    console.error('Error in checkProjects:', error)
  }
  process.exit(0)
}

checkProjects()
