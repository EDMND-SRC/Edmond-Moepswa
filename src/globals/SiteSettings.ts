import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'siteTitle',
      type: 'text',
      required: true,
      defaultValue:
        'Edmond Moepswa | Web Designer · Full-Stack Developer · Workflow Automation Specialist',
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'contactEmail',
      type: 'text',
      defaultValue: 'edmond.moepswa@gmail.com',
    },
    {
      name: 'contactPhone',
      type: 'text',
      defaultValue: '+267 78 692 888',
    },
    {
      name: 'whatsappNumber',
      type: 'text',
      defaultValue: '+267 78 692 888',
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
          validate: (value: string | string[] | null | undefined) => {
            if (typeof value === 'string' && value && !value.startsWith('https://'))
              return 'Must start with https://'
            return true
          },
        },
        {
          name: 'twitter',
          type: 'text',
          validate: (value: string | string[] | null | undefined) => {
            if (typeof value === 'string' && value && !value.startsWith('https://'))
              return 'Must start with https://'
            return true
          },
        },
        {
          name: 'github',
          type: 'text',
          validate: (value: string | string[] | null | undefined) => {
            if (typeof value === 'string' && value && !value.startsWith('https://'))
              return 'Must start with https://'
            return true
          },
        },
        {
          name: 'instagram',
          type: 'text',
          validate: (value: string | string[] | null | undefined) => {
            if (typeof value === 'string' && value && !value.startsWith('https://'))
              return 'Must start with https://'
            return true
          },
        },
        {
          name: 'threads',
          type: 'text',
          validate: (value: string | string[] | null | undefined) => {
            if (typeof value === 'string' && value && !value.startsWith('https://'))
              return 'Must start with https://'
            return true
          },
        },
        {
          name: 'substack',
          type: 'text',
          defaultValue: '',
          validate: (value: string | string[] | null | undefined) => {
            if (typeof value === 'string' && value && !value.startsWith('https://'))
              return 'Must start with https://'
            return true
          },
        },
      ],
    },
  ],
}
