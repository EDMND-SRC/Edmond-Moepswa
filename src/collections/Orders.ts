import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Orders: CollectionConfig = {
  slug: 'orders',
  access: {
    create: () => true, // Allowed for webhook, but normally protected by signature check in route
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'dodoPaymentId',
    defaultColumns: ['dodoPaymentId', 'customerEmail', 'amount', 'status', 'createdAt'],
  },
  fields: [
    {
      name: 'dodoPaymentId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Dodo Payments Transaction ID',
      },
    },
    {
      name: 'dodoSubscriptionId',
      type: 'text',
      admin: {
        description: 'Dodo Payments Subscription ID (if applicable)',
      },
    },
    {
      name: 'customerEmail',
      type: 'email',
      required: true,
      index: true,
    },
    {
      name: 'productName',
      type: 'text',
    },
    {
      name: 'productId',
      type: 'text',
    },
    {
      name: 'amount',
      type: 'number',
    },
    {
      name: 'currency',
      type: 'text',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'succeeded',
      options: [
        { label: 'Succeeded', value: 'succeeded' },
        { label: 'Failed', value: 'failed' },
        { label: 'Refunded', value: 'refunded' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      required: true,
    },
    {
      name: 'metadata',
      type: 'json',
      admin: {
        description: 'Full webhook payload for debugging',
      },
    },
  ],
  timestamps: true,
}
