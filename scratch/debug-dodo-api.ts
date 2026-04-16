import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function debug() {
  const apiKey = process.env.DODO_PAYMENTS_API_KEY;
  const env = process.env.DODO_PAYMENTS_ENVIRONMENT;
  
  console.log('API Key:', apiKey ? 'Loaded' : 'Missing');
  console.log('Environment:', env);
  
  const url = 'https://api.dodopayments.com/v1/products';
  console.log('Fetching from:', url);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Data:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}

debug();
