import { Box, Card, CardActionArea, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import ProductImage from './ProductImage';
import AddToCartButton from './AddToCartButton';
import { IS_WHOLESALE } from '../config/mode';
import { CARD_SHADOW_HOVER } from '../theme';
import { enter, stagger } from '../utils/animations';
import { formatPrice, getMinQty, getPrice } from '../utils/format';
import type { Product } from '../types';

const pill = {
  position: 'absolute',
  top: 8,
  px: 1,
  py: 0.25,
  borderRadius: '999px',
  fontSize: 11,
  fontWeight: 700,
} as const;

interface Props {
  product: Product;
  /** позиция в списке — для появления карточек «волной» */
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const price = getPrice(product) ?? 0;

  return (
    <Card
      sx={{
        ...enter(stagger(index, 0.15, 0.06)),
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: '20px',
        transition: 'box-shadow .25s, transform .25s',
        '&:hover': { boxShadow: CARD_SHADOW_HOVER, transform: 'translateY(-3px)' },
        '&:hover img': { transform: 'scale(1.04)' },
        '& img': { transition: 'transform .4s' },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={`/store/${product.storeId}/product/${product.id}`}
        sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start' }}
      >
        <Box sx={{ position: 'relative' }}>
          <ProductImage src={product.images[0]} alt={product.name} />
          {!product.inStock && (
            <Box sx={{ ...pill, left: 8, bgcolor: 'rgba(22,22,29,.75)', color: '#FFFFFF' }}>Нет в наличии</Box>
          )}
          {IS_WHOLESALE && product.inStock && (
            <Box
              sx={(t) => ({
                ...pill,
                left: 8,
                color: '#FFFFFF',
                bgcolor: 'primary.main',
                boxShadow: `0 4px 10px ${alpha(t.palette.primary.main, 0.35)}`,
              })}
            >
              от {getMinQty(product)} шт.
            </Box>
          )}
        </Box>
        <Box sx={{ p: { xs: 1.25, sm: 1.5 }, pb: 0 }}>
          <Typography
            sx={{ fontWeight: 800, fontSize: { xs: 16, sm: 18 }, color: 'primary.main', lineHeight: 1.2 }}
          >
            {formatPrice(price)}
          </Typography>
          <Typography
            sx={{
              mt: 0.5,
              fontSize: { xs: 14, sm: 15 },
              fontWeight: 700,
              lineHeight: 1.3,
              color: 'text.primary',
              minHeight: '2.6em',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.name}
          </Typography>
          {/* Описание: 2 строки на телефоне и планшете, 3 на компьютере, дальше «…» */}
          <Typography
            sx={{
              mt: 0.5,
              fontSize: { xs: 11.5, sm: 12.5 },
              fontWeight: 400,
              lineHeight: 1.4,
              color: '#8A8A96',
              minHeight: { xs: '2.8em', md: '4.2em' },
              display: '-webkit-box',
              WebkitLineClamp: { xs: 2, md: 3 },
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.description}
          </Typography>
        </Box>
      </CardActionArea>
      <Box sx={{ p: { xs: 1.25, sm: 1.5 }, pt: { xs: 0.75, sm: 1 } }}>
        <AddToCartButton product={product} size="small" fullWidth />
      </Box>
    </Card>
  );
}
