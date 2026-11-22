import { Box } from '@mui/material';
import { floating } from '../utils/animations';

/** Декоративные полупрозрачные круги для цветных баннеров. Родитель: position relative + overflow hidden. */
export default function Decor({ accent = 'rgba(255,255,255,.12)' }: { accent?: string }) {
  const circle = { position: 'absolute', borderRadius: '50%', pointerEvents: 'none' } as const;
  return (
    <>
      <Box
        sx={{ ...circle, width: 260, height: 260, right: -80, top: -110, bgcolor: 'rgba(255,255,255,.08)', ...floating(10) }}
      />
      <Box sx={{ ...circle, width: 140, height: 140, right: 60, bottom: -90, bgcolor: accent, ...floating(8, -3) }} />
      <Box
        sx={{
          ...circle,
          width: 90,
          height: 90,
          left: -30,
          bottom: -40,
          border: '14px solid rgba(255,255,255,.08)',
          ...floating(11, -6),
        }}
      />
    </>
  );
}
