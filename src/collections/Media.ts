import type { CollectionConfig } from 'payload'

import { createLexicalEditor } from '@/fields/defaultLexical'
import { canTransformMediaURL, getMediaTransformURL } from '@/utilities/getMediaTransformURL'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getServerSideURL } from '@/utilities/getURL'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: createLexicalEditor({ headingSizes: [] }),
    },
  ],
  upload: {
    adminThumbnail: ({ doc }) => {
      const sourceURL = getMediaUrl(doc.url as string | undefined)

      if (!sourceURL || !canTransformMediaURL(sourceURL)) {
        return sourceURL
      }

      return getMediaTransformURL({
        baseURL: getServerSideURL(),
        fit: 'cover',
        height: 300,
        sourceURL,
        width: 300,
      })
    },
    focalPoint: true,
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/gif', 'video/mp4'],
  },
}
