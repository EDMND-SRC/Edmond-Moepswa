import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'
import { slugField } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'category', 'priceCents', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'priceCents',
      type: 'number',
      min: 0,
      defaultValue: 0,
      admin: {
        description: 'Price in cents. Set to 0 for free resources.',
      },
    },
    {
      name: 'currency',
      type: 'text',
      defaultValue: 'USD',
      admin: {
        description: 'Currency code (e.g., USD, BWP).',
      },
    },
    {
      name: 'dodoProductId',
      type: 'text',
      required: true,
      admin: {
        description: 'The product ID from Dodo Payments dashboard.',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Free Resource', value: 'free' },
        { label: 'Paid Product', value: 'paid' },
      ],
      defaultValue: 'free',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'PDF Guide', value: 'guide' },
        { label: 'Checklist', value: 'checklist' },
        { label: 'E-book', value: 'ebook' },
        { label: 'Starter Kit / Boilerplate', value: 'boilerplate' },
        { label: 'Tool / Script', value: 'tool' },
      ],
      defaultValue: 'guide',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Product thumbnail image.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    slugField({ fieldToUse: 'title' }),
  ],
  timestamps: true,
}
