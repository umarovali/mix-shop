import { Box, Card, CardActionArea, Chip, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ProductImage from './ProductImage';
import AddToCartButton from './AddToCartButton';
import { IS_WHOLESALE } from '../config/mode';
import { formatPrice, getMinQty, getPrice } from '../utils/format';
import type { Product } from '../types';

export default function ProductCard({ product }: { product: Product }) {
  const price = getPrice(product) ?? 0;

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '16px' }}>
      <CardActionArea
        component={RouterLink}
        to={`/store/${product.storeId}/product/${product.id}`}
        sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start' }}
      >
        <Box sx={{ position: 'relative' }}>
          <ProductImage src={product.images[0]} alt={product.name} />
          {!product.inStock && (
            <Chip
              label="Нет в наличии"
              size="small"
              sx={{ position: 'absolute', left: 8, top: 8, bgcolor: 'rgba(255,255,255,.92)' }}
            />
          )}
        </Box>
        <Box sx={{ p: { xs: 1.25, sm: 1.5 }, pb: 1 }}>
          <Typography
            sx={{
              fontSize: { xs: 13, sm: 14 },
              fontWeight: 500,
              lineHeight: 1.35,
              minHeight: '2.7em',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.name}
          </Typography>
          <Typography sx={{ mt: 0.75, fontWeight: 700, fontSize: { xs: 15, sm: 17 } }}>
            {formatPrice(price)}
          </Typography>
          {IS_WHOLESALE && (
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              от {getMinQty(product)} шт.
            </Typography>
          )}
        </Box>
      </CardActionArea>
      <Box sx={{ p: { xs: 1.25, sm: 1.5 }, pt: 0 }}>
        <AddToCartButton product={product} size="small" fullWidth />
      </Box>
    </Card>
  );
}
