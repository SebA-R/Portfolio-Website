import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const dynamic = 'force-static';
export const alt = 'Sebastian Arellano-Rubach - AI Researcher & Data Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const soriaFont = readFileSync(join(process.cwd(), 'public/soria-font.ttf'));
  const skylineData = readFileSync(join(process.cwd(), 'public/images/toronto-skyline.jpg'));
  const skylineBase64 = `data:image/jpeg;base64,${skylineData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0a1628',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Soria',
        }}
      >
        {/* Skyline background, faded on right */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={skylineBase64}
          alt=""
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: 700,
            height: 400,
            objectFit: 'cover',
            objectPosition: 'center bottom',
            opacity: 0.18,
          }}
        />

        {/* Left-to-right gradient to fade skyline */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, #0a1628 38%, transparent 75%)',
            display: 'flex',
          }}
        />

        {/* Bottom gradient for readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, #0a1628 18%, transparent 50%)',
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '56px 72px',
          }}
        >
          {/* Top: URL */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#60a5fa',
              }}
            />
            <span
              style={{
                fontSize: 22,
                color: '#60a5fa',
                letterSpacing: '0.12em',
              }}
            >
              SEBASTIAN.WIKI
            </span>
          </div>

          {/* Middle: Name + title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div
              style={{
                fontSize: 96,
                fontWeight: 400,
                color: '#ffffff',
                lineHeight: 1,
                letterSpacing: '-0.01em',
              }}
            >
              SEBASTIAN
            </div>
            <div
              style={{
                fontSize: 96,
                fontWeight: 400,
                color: '#94a3b8',
                lineHeight: 1,
                letterSpacing: '-0.01em',
              }}
            >
              ARELLANO-RUBACH
            </div>
            <div
              style={{
                marginTop: 24,
                fontSize: 26,
                color: '#64748b',
                letterSpacing: '0.18em',
              }}
            >
              AI RESEARCHER · DATA ENGINEER
            </div>
          </div>

          {/* Bottom: Stats */}
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { label: 'PAPERS', value: '4' },
              { label: 'CITATIONS', value: '250+' },
              { label: 'HACK CANADA 2026', value: '1ST PLACE' },
              { label: 'UNIVERSITY', value: 'UWATERLOO · LAURIER' },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  padding: '12px 20px',
                  border: '1px solid #1e3a5f',
                  borderRadius: 8,
                  backgroundColor: 'rgba(255,255,255,0.03)',
                }}
              >
                <span style={{ fontSize: 28, color: '#ffffff', letterSpacing: '0.04em' }}>
                  {stat.value}
                </span>
                <span style={{ fontSize: 13, color: '#475569', letterSpacing: '0.1em' }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Soria', data: soriaFont, style: 'normal', weight: 400 }],
    }
  );
}
