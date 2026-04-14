import DodoPayments from 'dodopayments'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  environment: (process.env.DODO_PAYMENTS_ENVIRONMENT as 'test_mode' | 'live_mode') || 'test_mode',
})

async function setupCollections() {
  console.log('Seeding Dodo Product Collections...')
  
  // Note: At the time of writing, the Dodo SDK might have different names for collections or require specific dashboard setup.
  // We'll attempt to list products and see if we can organize them.
  // If the SDK doesn't support creating collections directly yet, we will provide the instructions.
  
  try {
     const products = await client.products.list({ limit: 100 } as any)
     const data = (products as any).data || []
     console.log(`Found ${data.length} products.`)
     
     // Log the products to help the user identify them for manual collection setup if needed
     data.forEach((p: any) => {
       console.log(`- [${p.product_id}] ${p.name} (${p.price_type})`)
     })

     console.log('\nInstructions for Manual Collection Setup in Dodo Dashboard:')
     console.log('1. Go to Storefront -> Collections')
     console.log('2. Create "Free Resources" and add products: 5 Signs..., Website Launch..., How to Brief...')
     console.log('3. Create "Boilerplates" and add the 9 boilerplate products.')
  } catch (err) {
    console.error('Error during Dodo setup:', err)
  }
}

setupCollections().catch(console.error).then(() => process.exit(0))
