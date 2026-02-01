import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#39ff14', // Neon Green to match brand
          borderRadius: '20%',
          border: '2px solid #39ff14',
          fontWeight: 'bold',
          fontFamily: 'monospace',
        }}
      >
        P
      </div>
    ),
    {
      ...size,
    }
  );
}
