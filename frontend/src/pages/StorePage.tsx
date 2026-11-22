import { Box, Button, Chip, Container, InputAdornment, TextField, Typography } from '@mui/material';
import SearchRounded from '@mui/icons-material/SearchRounded';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import LogoBadge from '../components/LogoBadge';
import Decor from '../components/Decor';
import { CARD_SHADOW } from '../theme';
import { HEADER_HEIGHT } from '../config/layout';
import { getStore } from '../data/stores';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { isAvailableInMode, plural } from '../utils/format';
import NotFoundPage from './NotFoundPage';

export default function StorePage() {
  const { storeId } = useParams();
  const store = getStore(storeId);
  const [params, setParams] = useSearchParams();

  if (!store) return <NotFoundPage />;

  const activeCat = params.get('cat');
  const query = params.get('q') ?? '';

  const updateParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const storeProducts = PRODUCTS.filter((p) => p.storeId === store.id && isAvailableInMode(p));
  const categories = CATEGORIES.filter(
    (c) => c.storeId === store.id && storeProducts.some((p) => p.categoryId === c.id),
  );
  const q = query.trim().toLowerCase();
  const list = storeProducts.filter(
    (p) =>
      (!activeCat || p.categoryId === activeCat) &&
      (!q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)),
  );

  return (
    <>
      {/* Цветной баннер магазина */}
      <Box sx={{ backgroundImage: store.colors.hero, color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
        <Decor accent={store.id === 'plus' ? 'rgba(232,20,27,.55)' : 'rgba(255,255,255,.14)'} />
        <Container
          maxWidth="lg"
          sx={{ position: 'relative', py: { xs: 3, md: 5 }, display: 'flex', alignItems: 'center', gap: { xs: 2, md: 3 } }}
        >
          <LogoBadge src={store.icon} size={{ xs: 72, md: 112 }} />
          <Box sx={{ minWidth: 0 }}>
            <Typography component="h1" sx={{ fontWeight: 800, fontSize: { xs: 24, md: 38 }, lineHeight: 1.15 }}>
              {store.name}
            </Typography>
            <Typography sx={{ fontSize: { xs: 13, md: 16 }, opacity: 0.88, mt: 0.5 }}>{store.description}</Typography>
          </Box>
        </Container>
      </Box>

      {/* Поиск и категории — прилипают под шапкой при прокрутке */}
      <Box
        sx={{
          position: 'sticky',
          top: HEADER_HEIGHT,
          zIndex: 2,
          bgcolor: 'rgba(243,244,248,.88)',
          backdropFilter: 'saturate(180%) blur(12px)',
        }}
      >
        <Container maxWidth="lg" sx={{ pt: 1.5, pb: 1.25 }}>
          <TextField
            size="small"
            placeholder="Поиск по названию или артикулу"
            value={query}
            onChange={(e) => updateParam('q', e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': { boxShadow: CARD_SHADOW, height: 46 },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRounded />
                  </InputAdornment>
                ),
              },
              htmlInput: { 'aria-label': 'Поиск товаров', enterKeyHint: 'search' },
            }}
          />
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              mt: 1,
              pb: 0.5,
              overflowX: 'auto',
              mx: { xs: -2, sm: 0 },
              px: { xs: 2, sm: 0 },
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {[{ id: null, name: 'Все' }, ...categories].map((c) => {
              const active = activeCat === c.id;
              return (
                <Chip
                  key={c.id ?? 'all'}
                  label={c.name}
                  clickable
                  onClick={() => updateParam('cat', c.id)}
                  sx={{
                    flexShrink: 0,
                    height: 36,
                    px: 0.5,
                    border: 'none',
                    ...(active
                      ? {
                          color: '#FFFFFF',
                          backgroundImage: store.colors.gradient,
                          boxShadow: '0 4px 12px rgba(0,0,0,.15)',
                        }
                      : { bgcolor: 'background.paper', boxShadow: CARD_SHADOW }),
                  }}
                />
              );
            })}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pt: 2 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
          Найдено: {list.length} {plural(list.length, ['товар', 'товара', 'товаров'])}
        </Typography>

        {list.length > 0 ? (
          <Box
            sx={{
              display: 'grid',
              gap: { xs: 1.5, md: 2.5 },
              // телефон: вторая колонка ниже на 15px — «лесенка» для разнообразия
              '& > :nth-of-type(2n)': { position: 'relative', top: { xs: '15px', sm: 0 } },
              pb: { xs: '15px', sm: 0 },
              gridTemplateColumns: {
                xs: 'repeat(2, minmax(0, 1fr))',
                sm: 'repeat(3, minmax(0, 1fr))',
                md: 'repeat(4, minmax(0, 1fr))',
              },
            }}
          >
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography sx={{ fontWeight: 600, mb: 1 }}>Ничего не найдено</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              Попробуйте изменить запрос или выбрать другую категорию
            </Typography>
            <Button variant="outlined" onClick={() => setParams({}, { replace: true })}>
              Сбросить фильтры
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
}
