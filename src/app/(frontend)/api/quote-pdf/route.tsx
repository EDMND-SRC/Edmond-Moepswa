import { NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { QuotePDF } from '@/components/homepage/CalculatorSection/QuotePDF'
import React from 'react'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { selections } = data

    if (!selections) {
      return NextResponse.json({ error: 'Missing selections data' }, { status: 400 })
    }

    const buffer = await renderToBuffer(<QuotePDF selections={selections} />)

    // Construct safe filename
    const safeLabel = String(selections.serviceLabel || 'quote').replace(/\s+/g, '-').toLowerCase()

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="quote-${safeLabel}.pdf"`,
        'Content-Length': buffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('PDF Generation Error:', error)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
