import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({ fieldToUse: 'title' }),
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Web Design & Development', value: 'web' },
        { label: 'Workflow Automation', value: 'automation' },
        { label: 'Boilerplate Products', value: 'boilerplate' },
        { label: 'Open Source', value: 'open-source' },
        { label: 'SEO & GEO', value: 'seo' },
      ],
      required: true,
    },
    {
      name: 'year',
      type: 'text',
      admin: {
        description: 'e.g. 2024 or 2023-2024',
      },
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'images',
      type: 'array',
      maxRows: 20,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        description: 'Live site or case study link',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  timestamps: true,
}
