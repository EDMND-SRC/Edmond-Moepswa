import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const Leads: CollectionConfig = {
  slug: 'leads',
  access: {
    create: anyone,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'source', 'status', 'createdAt'],
  },
  fields: [
    {
      name: 'website',
      type: 'text',
      admin: {
        condition: () => false,
      },
      validate: (value: string | string[] | null | undefined) => {
        if (typeof value === 'string' && value) return 'Spam detected'
        return true
      },
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'source',
      type: 'select',
      options: [
        { label: 'Contact Form', value: 'contact' },
        { label: 'Calculator', value: 'calculator' },
        { label: 'Gumroad', value: 'gumroad' },
      ],
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'calculatorData',
      type: 'json',
      admin: {
        condition: (data) => data.source === 'calculator',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Closed', value: 'closed' },
      ],
      defaultValue: 'new',
    },
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Basic email validation to prevent spam submissions
        if (data.email && typeof data.email === 'string') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(data.email)) {
            throw new Error('Invalid email address format')
          }
        }
        // Sanitize name field
        if (data.name && typeof data.name === 'string') {
          data.name = data.name.trim()
        }
        return data
      },
    ],
  },
}
