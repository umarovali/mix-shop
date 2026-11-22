import { Box } from '@mui/material';
interface Props {
  src: string;
  /** число или размеры по ширине экрана: { xs: 64, md: 96 } */
  size: number | { xs?: number; sm?: number; md?: number; lg?: number };
}

/** Логотип в белом круге с тенью — хорошо читается на любом цветном фоне. */
export default function LogoBadge({ src, size }: Props) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: '50%',
        bgcolor: '#FFFFFF',
        display: 'grid',
        placeItems: 'center',
        boxShadow: '0 8px 24px rgba(0,0,0,.18)',
        position: 'relative',
      }}
    >
      <Box component="img" src={src} alt="" sx={{ width: '78%', height: '78%', objectFit: 'contain' }} />
    </Box>
  );
}
