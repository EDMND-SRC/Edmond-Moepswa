import type { CollectionConfig } from 'payload'

import type { User } from '@/payload-types'
import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: ({ req: { user } }) => {
      // Only admins can delete users
      return Boolean(user) && (user as User).roles?.includes('admin') === true
    },
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      defaultValue: ['editor'],
      required: true,
      saveToJWT: true,
      access: {
        update: ({ req: { user } }) => {
          return Boolean(user) && (user as User).roles?.includes('admin') === true
        },
      },
    },
  ],
  timestamps: true,
}
