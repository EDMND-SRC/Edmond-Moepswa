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

    // Render PDF to stream
    const stream = await renderToStream(<QuotePDF selections={selections} />)
    
    // Convert Node stream to Web stream for NextResponse
    const webStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream as any) {
          controller.enqueue(chunk)
        }
        controller.close()
      },
    })

    return new NextResponse(webStream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="quote-${selections.serviceLabel.replace(/\s+/g, '-').toLowerCase()}.pdf"`,
      },
    })
  } catch (error) {
    console.error('PDF Generation Error:', error)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
