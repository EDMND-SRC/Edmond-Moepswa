import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin, Field } from 'payload'
import { fieldAffectsData } from 'payload/shared'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { createLexicalEditor } from '@/fields/defaultLexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<any> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Edmond Moepswa` : 'Edmond Moepswa — Web Designer & Developer'
}

const generateURL: GenerateURL<any> = ({ doc }) => {
  const url = getServerSideURL()
  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages'],
    overrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if (fieldAffectsData(field) && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  seoPlugin({
    collections: ['pages', 'services', 'projects'],
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field: Field) => {
          if (fieldAffectsData(field) && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: createLexicalEditor({
                headingSizes: ['h1', 'h2', 'h3', 'h4'],
                fixedToolbar: true,
                inlineToolbar: false,
              }),
            }
          }
          return field
        })
      },
    },
  }),
  searchPlugin({
    collections: ['pages', 'services', 'projects'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
]
