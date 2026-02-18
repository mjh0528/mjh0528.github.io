import { ImageResponse } from 'next/og';

export const alt = 'joonhyeop.site Open Graph image';
export const size = {
  width: 1200,
  height: 630
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: 'linear-gradient(135deg, #0f172a, #1d4ed8)',
          color: '#f8fafc'
        }}
      >
        <div
          style={{
            fontSize: 34,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            opacity: 0.88
          }}
        >
          Personal Blog
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1 }}>joonhyeop.site</div>
          <div style={{ fontSize: 36, opacity: 0.92 }}>인간 문준협의 사소한 기록</div>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
