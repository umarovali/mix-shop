import { Box, Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import { CARD_SHADOW } from '../theme';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import Decor from '../components/Decor';
import StoreSearchEntry from '../components/StoreSearchEntry';
import { HEADER_HEIGHT } from '../config/layout';
import { enter, stagger } from '../utils/animations';
import { getStore } from '../data/stores';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { formatPrice, getPrice, isAvailableInMode, plural } from '../utils/format';
import { getCategoryIcon } from '../config/categoryIcons';
import NotFoundPage from './NotFoundPage';

/** Все категории магазина: на телефоне — плитка 4 в ряд, на планшете и компьютере — горизонтальные карточки. */
export default function CatalogPage() {
  const { storeId } = useParams();
  const store = getStore(storeId);
  const theme = useTheme();
  const wide = useMediaQuery(theme.breakpoints.up('sm'));
  if (!store) return <NotFoundPage />;

  const storeProducts = PRODUCTS.filter((p) => p.storeId === store.id && isAvailableInMode(p));
  const categories = CATEGORIES.filter((c) => c.storeId === store.id)
    .map((c) => {
      const items = storeProducts.filter((p) => p.categoryId === c.id);
      return { ...c, count: items.length, minPrice: Math.min(...items.map((p) => getPrice(p) ?? 0)) };
    })
    .filter((c) => c.count > 0);

  return (
    <>
      <Box sx={{ backgroundImage: store.colors.hero, color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
        <Decor accent={store.id === 'plus' ? 'rgba(232,20,27,.55)' : 'rgba(255,255,255,.14)'} />
        <Container maxWidth="lg" sx={{ position: 'relative', py: { xs: 3, md: 5 } }}>
          <Box
            component={RouterLink}
            to={`/store/${store.id}`}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'inherit',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 600,
              opacity: 0.85,
              '&:hover': { opacity: 1 },
            }}
          >
            <ArrowBackRounded fontSize="small" /> {store.name}
          </Box>
          <Typography
            component="h1"
            sx={{ fontWeight: 800, fontSize: { xs: 26, md: 40 }, lineHeight: 1.15, mt: 1, ...enter(0.05) }}
          >
            Каталог
          </Typography>
          <Typography sx={{ fontSize: { xs: 13, md: 16 }, opacity: 0.88, mt: 0.5, ...enter(0.12) }}>
            {categories.length} {plural(categories.length, ['категория', 'категории', 'категорий'])}
          </Typography>
        </Container>
      </Box>

      {/* Тот же поиск с фильтрами, что и на странице магазина — прилипает под шапкой */}
      <Box
        sx={{
          position: 'sticky',
          top: HEADER_HEIGHT,
          zIndex: 2,
          bgcolor: 'rgba(243,244,248,.88)',
          backdropFilter: 'saturate(180%) blur(12px)',
        }}
      >
        <Container maxWidth="lg" sx={{ py: 1.5 }}>
          <StoreSearchEntry store={store} />
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pt: { xs: 1, md: 2.5 } }}>
        {wide ? (
          // Планшет и компьютер: горизонтальные карточки — иконка, название, число товаров и цена «от»
          <Box
            sx={{
              display: 'grid',
              gap: { sm: 1.5, md: 2 },
              gridTemplateColumns: { sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(3, minmax(0, 1fr))' },
            }}
          >
            {categories.map((c, i) => {
              const Icon = getCategoryIcon(c.icon);
              return (
                <Box
                  key={c.id}
                  component={RouterLink}
                  to={`/store/${store.id}?cat=${c.id}`}
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderRadius: '20px',
                    color: 'text.primary',
                    textDecoration: 'none',
                    bgcolor: 'background.paper',
                    backgroundImage: `radial-gradient(80% 120% at 100% 0%, ${alpha(store.colors.primary, 0.08)} 0%, ${alpha(store.colors.primary, 0)} 60%)`,
                    boxShadow: CARD_SHADOW,
                    transition: 'transform .3s cubic-bezier(.22, 1, .36, 1), box-shadow .3s',
                    ...enter(stagger(i, 0.15, 0.04)),
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: `0 14px 30px ${alpha(store.colors.primary, 0.16)}`,
                    },
                    '&:hover .tile-icon': { transform: 'scale(1.08) rotate(-4deg)' },
                    '&:hover .chevron': { transform: 'translateX(3px)', color: store.colors.primary },
                    '&:focus-visible': { outline: `2px solid ${store.colors.primary}`, outlineOffset: 2 },
                  }}
                >
                  <Box
                    className="tile-icon"
                    sx={{
                      width: 60,
                      height: 60,
                      flexShrink: 0,
                      borderRadius: '18px',
                      display: 'grid',
                      placeItems: 'center',
                      color: '#FFFFFF',
                      backgroundImage: store.colors.gradient,
                      boxShadow: `0 6px 14px ${alpha(store.colors.primary, 0.3)}, inset 0 1px 0 rgba(255,255,255,.35)`,
                      transition: 'transform .35s cubic-bezier(.22, 1, .36, 1)',
                    }}
                  >
                    <Icon sx={{ fontSize: 30 }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 16, lineHeight: 1.25 }}>{c.name}</Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: 13, mt: 0.5 }}>
                      {c.count} {plural(c.count, ['товар', 'товара', 'товаров'])} · от {formatPrice(c.minPrice)}
                    </Typography>
                  </Box>
                  <ChevronRightRounded
                    className="chevron"
                    sx={{ color: 'text.disabled', transition: 'transform .25s, color .25s' }}
                  />
                </Box>
              );
            })}
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              columnGap: { xs: 1.25, sm: 2, md: 3 },
              rowGap: { xs: 2.25, md: 3.5 },
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            }}
          >
            {categories.map((c, i) => {
              const Icon = getCategoryIcon(c.icon);
              return (
                <Box
                  key={c.id}
                  component={RouterLink}
                  to={`/store/${store.id}?cat=${c.id}`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    color: 'text.primary',
                    textDecoration: 'none',
                    WebkitTapHighlightColor: 'transparent',
                    ...enter(stagger(i, 0.15)),
                    '&:hover .tile': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 14px 30px ${alpha(store.colors.primary, 0.22)}`,
                    },
                    '&:hover .tile-icon': { transform: 'scale(1.1)' },
                    '&:active .tile': { transform: 'scale(.96)' },
                    '&:focus-visible': { outline: 'none' },
                    '&:focus-visible .tile': { outline: `2px solid ${store.colors.primary}`, outlineOffset: 3 },
                  }}
                >
                  {/* Квадратная плитка: мягкий оттенок магазина + блик + иконка */}
                  <Box
                    className="tile"
                    sx={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: { xs: '1 / 1', md: '4 / 3' },
                      borderRadius: { xs: '20px', md: '28px' },
                      overflow: 'hidden',
                      display: 'grid',
                      placeItems: 'center',
                      bgcolor: 'background.paper',
                      backgroundImage: `radial-gradient(120% 90% at 100% 0%, ${alpha(store.colors.primary, 0.16)} 0%, ${alpha(store.colors.primary, 0)} 60%), linear-gradient(160deg, #FFFFFF 0%, ${store.colors.soft} 100%)`,
                      boxShadow: `0 1px 2px rgba(20,20,43,.04), 0 6px 18px ${alpha(store.colors.primary, 0.1)}`,
                      transition: 'transform .3s cubic-bezier(.22, 1, .36, 1), box-shadow .3s',
                    }}
                  >
                    {/* декоративный круг в углу */}
                    <Box
                      sx={{
                        position: 'absolute',
                        width: '70%',
                        aspectRatio: '1 / 1',
                        right: '-25%',
                        bottom: '-30%',
                        borderRadius: '50%',
                        bgcolor: alpha(store.colors.primary, 0.06),
                      }}
                    />
                    <Box
                      className="tile-icon"
                      sx={{
                        position: 'relative',
                        width: { xs: 44, sm: 60, md: 76 },
                        height: { xs: 44, sm: 60, md: 76 },
                        borderRadius: { xs: '14px', md: '24px' },
                        display: 'grid',
                        placeItems: 'center',
                        color: '#FFFFFF',
                        backgroundImage: store.colors.gradient,
                        boxShadow: `0 6px 14px ${alpha(store.colors.primary, 0.35)}, inset 0 1px 0 rgba(255,255,255,.35)`,
                        transition: 'transform .35s cubic-bezier(.22, 1, .36, 1)',
                      }}
                    >
                      <Icon sx={{ fontSize: { xs: 24, sm: 32, md: 40 } }} />
                    </Box>
                  </Box>

                  <Typography
                    sx={{
                      mt: { xs: 0.75, md: 1.25 },
                      fontWeight: 700,
                      fontSize: { xs: 11.5, sm: 14, md: 16 },
                      lineHeight: 1.2,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      wordBreak: 'break-word',
                    }}
                  >
                    {c.name}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', mt: 0.25, fontSize: { xs: 10.5, sm: 12, md: 13 } }}>
                    {c.count} {plural(c.count, ['товар', 'товара', 'товаров'])}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        )}
      </Container>
    </>
  );
}
