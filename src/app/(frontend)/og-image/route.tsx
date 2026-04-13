import { ImageResponse } from 'next/og'

export const runtime = 'edge'

// Cache font fetch at module level for the edge runtime
const geistBold = fetch(
  'https://raw.githubusercontent.com/vercel/geist-font/main/packages/fonts/src/static/Geist-Bold.ttf',
).then((res) => res.arrayBuffer())

export async function GET() {
  const fontData = await geistBold

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '80px',
        backgroundColor: '#0a0a0a',
        color: '#ffffff',
        fontFamily: 'Geist',
      }}
    >
      {/* Geometric accent line */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
        <div
          style={{ width: '60px', height: '4px', backgroundColor: '#FF4D2E', borderRadius: '2px' }}
        />
        <div
          style={{
            width: '12px',
            height: '4px',
            backgroundColor: '#FF4D2E',
            opacity: 0.5,
            borderRadius: '2px',
          }}
        />
      </div>

      <div
        style={{
          fontSize: '72px',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          marginBottom: '16px',
        }}
      >
        Edmond Moepswa
      </div>

      <div
        style={{
          fontSize: '36px',
          fontWeight: 500,
          color: '#FF4D2E',
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
          marginBottom: '24px',
        }}
      >
        Systems Thinker & Builder
      </div>

      <div
        style={{
          fontSize: '24px',
          fontWeight: 400,
          color: '#b0b0b0',
          lineHeight: 1.4,
          marginBottom: '48px',
        }}
      >
        Web Design {'\u00B7'} Development {'\u00B7'} Workflow Automation
      </div>

      <div
        style={{
          fontSize: '18px',
          fontWeight: 400,
          color: '#525252',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        Gaborone, Botswana
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '80px',
          right: '80px',
          height: '1px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }}
      />
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Geist',
          data: fontData,
          weight: 700,
          style: 'normal',
        },
      ],
    },
  )
}
