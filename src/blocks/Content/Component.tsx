import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colSpanMap: Record<string, string> = {
    full: 'col-span-12',
    half: 'col-span-6',
    oneThird: 'col-span-4',
    twoThirds: 'col-span-8',
  }

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col
            const colSpanClass = colSpanMap[size || 'oneThird'] || 'col-span-12'

            return (
              <div
                className={cn(colSpanClass, {
                  'md:col-span-2': size !== 'full',
                })}
                key={`${size}-${index}`}
              >
                {richText && <RichText data={richText} enableGutter={false} />}

                {enableLink && link && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
