/**
 * create-dodo-automations.ts
 * 
 * Programmatically creates 3 Make.com automation templates as test products
 * in the Dodo Payments dashboard.
 */

import { DodoPayments } from 'dodopayments';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const dodo = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY,
  environment: 'test_mode',
});

const automations = [
  {
    name: 'WhatsApp AI Chatbot (Make.com Template)',
    description: 'A production-ready Make.com blueprint to connect OpenAI with WhatsApp via the Cloud API. Includes memory handling and intent routing.',
    price: 4900, // $49.00
  },
  {
    name: 'WhatsApp Appointment Reminder (Make.com Template)',
    description: 'Automatically send WhatsApp reminders 24 hours before any Cal.com or Google Calendar event to reduce no-shows.',
    price: 2900, // $29.00
  },
  {
    name: 'Automated Booking CRM (Make.com Template)',
    description: 'Sync your bookings from Cal.com to Google Sheets, Notion, or HubSpot automatically with full lead attribution tracking.',
    price: 3900, // $39.00
  },
];

async function create() {
  console.log('🚀 Creating Make.com automation products in Dodo Payments (Test Mode)...');
  
  for (const item of automations) {
    try {
      const product = await dodo.products.create({
        name: item.name,
        description: item.description,
        tax_category: 'digital_products',
        price: {
          price: item.price,
          currency: 'USD',
          type: 'one_time_price',
          discount: 0,
          purchasing_power_parity: false,
        },
      } as any);
      
      console.log(`✅ Created: ${item.name} (ID: ${(product as any).product_id})`);
    } catch (error) {
      console.error(`❌ Failed to create ${item.name}:`, error);
    }
  }
  
  console.log('\n✨ All products processed.');
}

create();
