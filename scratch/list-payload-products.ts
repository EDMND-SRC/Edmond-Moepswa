import { getPayload } from 'payload'
import config from '../src/payload.config'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

async function listProducts() {
  const payload = await getPayload({ config })
  const products = await payload.find({
    collection: 'products',
    limit: 100,
  })
  
  console.log(JSON.stringify(products.docs, null, 2))
  process.exit(0)
}

listProducts()
