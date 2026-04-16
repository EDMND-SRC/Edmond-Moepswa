import DodoPayments from 'dodopayments';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  environment: process.env.DODO_PAYMENTS_ENVIRONMENT === 'test' ? 'test_mode' : 'live_mode',
});

async function listDodoProducts() {
  try {
    const products = await client.products.list({
      page_number: 1,
      page_size: 100,
    });
    console.log(JSON.stringify(products, null, 2));
  } catch (error) {
    console.error('Failed to list Dodo products:', error);
  }
}

listDodoProducts();
