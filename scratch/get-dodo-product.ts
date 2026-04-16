import DodoPayments from 'dodopayments';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  environment: process.env.DODO_PAYMENTS_ENVIRONMENT === 'test' ? 'test_mode' : 'live_mode',
});

async function getProduct() {
  const id = 'pdt_0NceaY8UNB1GoMOLesz8X';
  console.log(`Fetching product ${id}...`);
  try {
    const product = await client.products.retrieve(id);
    console.log(JSON.stringify(product, null, 2));
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
  }
}

getProduct();
