import { DodoPayments } from 'dodopayments';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const dodo = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY,
  environment: 'test_mode',
});

async function test() {
  try {
    const products = await dodo.products.list();
    console.log('Dodo Products:', JSON.stringify(products, null, 2));
  } catch (error) {
    console.error('Error fetching Dodo products:', error);
  }
}

test();
