import { useState } from 'react';
import { Box, Chip, Container, Paper, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { enter, fadeUp, zoomIn } from '../utils/animations';
import { Link as RouterLink, useParams } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import AddToCartButton from '../components/AddToCartButton';
import { getCategory, getProduct } from '../data/products';
import { IS_WHOLESALE } from '../config/mode';
import { formatPrice, getMinQty, getPrice, isAvailableInMode } from '../utils/format';
import NotFoundPage from './NotFoundPage';

export default function ProductPage() {
  const { storeId, productId } = useParams();
  const product = getProduct(productId);
  const [activeImage, setActiveImage] = useState(0);

  if (!product || product.storeId !== storeId || !isAvailableInMode(product)) return <NotFoundPage />;

  const category = getCategory(product.categoryId);
  const price = getPrice(product) ?? 0;
  const min = getMinQty(product);

  const priceBlock = (
    <Box>
      <Typography sx={{ fontWeight: 800, fontSize: { xs: 26, md: 32 }, lineHeight: 1.2, color: 'primary.main' }}>
        {formatPrice(price)}
      </Typography>
      {IS_WHOLESALE && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Оптовая цена за 1 шт. · заказ от {min} шт.
        </Typography>
      )}
    </Box>
  );

  return (
    <>
      <Container maxWidth="lg" sx={{ pt: { xs: 2, md: 4 }, pb: { xs: 12, md: 4 } }}>
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 2.5, md: 5 },
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) minmax(0, 1fr)' },
            alignItems: 'start',
          }}
        >
          {/* Галерея */}
          <Box sx={{ position: { md: 'sticky' }, top: { md: 92 }, ...enter(0.05, zoomIn, 0.6) }}>
            <ProductImage
              src={product.images[activeImage]}
              alt={product.name}
              sx={{ borderRadius: '24px', boxShadow: '0 4px 20px rgba(20,20,43,.08)' }}
            />
            {product.images.length > 1 && (
              <Box sx={{ display: 'flex', gap: 1, mt: 1.5, overflowX: 'auto' }}>
                {product.images.map((src, i) => (
                  <Box
                    key={src + i}
                    component="button"
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`Фото ${i + 1}`}
                    sx={{
                      p: 0,
                      width: 64,
                      flexShrink: 0,
                      borderRadius: '10px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: 2,
                      borderColor: i === activeImage ? 'primary.main' : 'transparent',
                    }}
                  >
                    <ProductImage src={src} alt="" />
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          {/* Информация */}
          <Box sx={enter(0.15)}>
            {category && (
              <Chip
                label={category.name}
                size="small"
                clickable
                component={RouterLink}
                to={`/store/${product.storeId}?cat=${category.id}`}
                sx={{ mb: 1.5 }}
              />
            )}
            <Typography component="h1" sx={{ fontWeight: 700, fontSize: { xs: 20, md: 28 }, lineHeight: 1.25 }}>
              {product.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.75 }}>
              Артикул: {product.sku}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1.5 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: product.inStock ? 'success.main' : 'text.disabled',
                }}
              />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {product.inStock ? 'В наличии' : 'Нет в наличии'}
              </Typography>
            </Box>

            {/* Цена и кнопка — на компьютере здесь, на телефоне внизу экрана */}
            <Paper
              elevation={0}
              sx={(t) => ({
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 3,
                p: 2.5,
                mt: 3,
                borderRadius: '20px',
                bgcolor: alpha(t.palette.primary.main, 0.06),
                border: `1px solid ${alpha(t.palette.primary.main, 0.15)}`,
              })}
            >
              <Box sx={{ flex: 1 }}>{priceBlock}</Box>
              <Box sx={{ width: 220 }}>
                <AddToCartButton product={product} size="large" fullWidth />
              </Box>
            </Paper>
            <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 2 }}>{priceBlock}</Box>

            <Typography component="h2" sx={{ fontWeight: 700, fontSize: 18, mt: 4, mb: 1 }}>
              Описание
            </Typography>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>{product.description}</Typography>

            {product.specs.length > 0 && (
              <>
                <Typography component="h2" sx={{ fontWeight: 700, fontSize: 18, mt: 4, mb: 1 }}>
                  Характеристики
                </Typography>
                <Box component="dl" sx={{ m: 0 }}>
                  {product.specs.map((s) => (
                    <Box
                      key={s.label}
                      sx={{
                        display: 'flex',
                        gap: 2,
                        py: 1.25,
                        borderBottom: 1,
                        borderColor: 'divider',
                        fontSize: 14,
                      }}
                    >
                      <Box component="dt" sx={{ color: 'text.secondary', flex: '0 0 42%' }}>
                        {s.label}
                      </Box>
                      <Box component="dd" sx={{ m: 0, fontWeight: 500 }}>
                        {s.value}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Container>

      {/* Нижняя панель на телефоне */}
      <Paper
        elevation={0}
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: (t) => t.zIndex.appBar,
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          pt: 1.5,
          pb: 'calc(12px + env(safe-area-inset-bottom))',
          borderRadius: '20px 20px 0 0',
          // панель «выезжает» снизу
          ...enter(0.25, fadeUp, 0.5),
          boxShadow: '0 -6px 24px rgba(20,20,43,.10)',
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography noWrap sx={{ fontWeight: 800, fontSize: 19, color: 'primary.main' }}>
            {formatPrice(price)}
          </Typography>
          {IS_WHOLESALE && (
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              от {min} шт.
            </Typography>
          )}
        </Box>
        <Box sx={{ width: 170, flexShrink: 0 }}>
          <AddToCartButton product={product} fullWidth />
        </Box>
      </Paper>
    </>
  );
}
