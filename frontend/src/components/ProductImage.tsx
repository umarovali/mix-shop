import { Box, Typography } from '@mui/material';
import ImageOutlined from '@mui/icons-material/ImageOutlined';
import type { SxProps, Theme } from '@mui/material/styles';

interface Props {
  src?: string;
  alt: string;
  sx?: SxProps<Theme>;
}

/** Квадратное фото товара. Если фото нет — аккуратная заглушка. */
export default function ProductImage({ src, alt, sx }: Props) {
  return (
    <Box
      sx={[
        { position: 'relative', aspectRatio: '1 / 1', width: '100%', overflow: 'hidden', bgcolor: '#F4F4F7' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {src ? (
        <Box
          component="img"
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5,
            color: 'text.disabled',
          }}
        >
          <ImageOutlined sx={{ fontSize: 40 }} />
          <Typography variant="caption">Фото скоро</Typography>
        </Box>
      )}
    </Box>
  );
}
