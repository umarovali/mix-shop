import { Box, Typography } from '@mui/material';
import { alpha, type SxProps, type Theme } from '@mui/material/styles';
import { getCategory } from '../data/products';
import { getStore } from '../data/stores';
import { getCategoryIcon } from '../config/categoryIcons';
import type { Product } from '../types';

interface Props {
  src?: string;
  alt: string;
  /** если фото нет — заглушка с иконкой категории в цветах магазина */
  product?: Product;
  /** мелкая заглушка без подписи (миниатюры в корзине и галерее) */
  compact?: boolean;
  sx?: SxProps<Theme>;
}

/** Квадратное фото товара. Если фото нет — аккуратная заглушка. */
export default function ProductImage({ src, alt, product, compact, sx }: Props) {
  const store = product ? getStore(product.storeId) : undefined;
  const category = product ? getCategory(product.categoryId) : undefined;
  const Icon = getCategoryIcon(category?.icon);
  const primary = store?.colors.primary ?? '#9A9AA6';

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
            gap: 1,
            backgroundImage: `radial-gradient(90% 70% at 100% 0%, ${alpha(primary, 0.14)} 0%, ${alpha(primary, 0)} 70%), linear-gradient(160deg, #FFFFFF 0%, ${store?.colors.soft ?? '#F4F4F7'} 100%)`,
          }}
        >
          {/* декоративный круг */}
          <Box
            sx={{
              position: 'absolute',
              width: '75%',
              aspectRatio: '1 / 1',
              right: '-30%',
              bottom: '-30%',
              borderRadius: '50%',
              bgcolor: alpha(primary, 0.06),
            }}
          />
          <Box
            sx={{
              position: 'relative',
              width: compact ? '46%' : '34%',
              aspectRatio: '1 / 1',
              borderRadius: '28%',
              display: 'grid',
              placeItems: 'center',
              color: '#FFFFFF',
              backgroundImage: store?.colors.gradient ?? 'none',
              bgcolor: primary,
              opacity: 0.9,
              boxShadow: `0 8px 18px ${alpha(primary, 0.28)}`,
              '& svg': { width: '55%', height: '55%' },
            }}
          >
            <Icon />
          </Box>
          {!compact && (
            <Typography variant="caption" sx={{ position: 'relative', color: alpha(primary, 0.7), fontWeight: 600 }}>
              Фото скоро
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
