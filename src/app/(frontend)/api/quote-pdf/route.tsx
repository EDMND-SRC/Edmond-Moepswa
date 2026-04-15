import { NextResponse } from 'next/server'
import { renderToStream } from '@react-pdf/renderer'
import { QuotePDF } from '@/components/homepage/CalculatorSection/QuotePDF'
import React from 'react'
import { Readable } from 'stream'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { selections } = data

    if (!selections) {
      return NextResponse.json({ error: 'Missing selections data' }, { status: 400 })
    }

    const stream = (await renderToStream(<QuotePDF selections={selections} />)) as unknown as Readable

    // Construct safe filename
    const safeLabel = String(selections.serviceLabel || 'quote').replace(/\s+/g, '-').toLowerCase()

    return new NextResponse(stream as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="quote-${safeLabel}.pdf"`,
      },
    })
  } catch (error) {
    console.error('PDF Generation Error:', error)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
