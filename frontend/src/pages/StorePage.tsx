import { Box, Button, Chip, Container, InputAdornment, TextField, Typography } from '@mui/material';
import SearchRounded from '@mui/icons-material/SearchRounded';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
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
      {/* Плашка магазина */}
      <Box sx={{ bgcolor: store.colors.soft }}>
        <Container maxWidth="lg" sx={{ py: { xs: 2.5, md: 4 }, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            component="img"
            src={store.icon}
            alt=""
            sx={{ width: { xs: 64, md: 96 }, height: { xs: 64, md: 96 }, objectFit: 'contain', flexShrink: 0 }}
          />
          <Box sx={{ minWidth: 0 }}>
            <Typography component="h1" sx={{ fontWeight: 700, fontSize: { xs: 22, md: 32 }, lineHeight: 1.2 }}>
              {store.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
              {store.description}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Поиск и категории — прилипают под шапкой при прокрутке */}
      <Box
        sx={{
          position: 'sticky',
          top: HEADER_HEIGHT,
          zIndex: 2,
          bgcolor: 'background.default',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg" sx={{ pt: 1.5, pb: 1 }}>
          <TextField
            size="small"
            placeholder="Поиск по названию или артикулу"
            value={query}
            onChange={(e) => updateParam('q', e.target.value)}
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
            <Chip
              label="Все"
              clickable
              color={!activeCat ? 'primary' : 'default'}
              variant={!activeCat ? 'filled' : 'outlined'}
              onClick={() => updateParam('cat', null)}
            />
            {categories.map((c) => (
              <Chip
                key={c.id}
                label={c.name}
                clickable
                color={activeCat === c.id ? 'primary' : 'default'}
                variant={activeCat === c.id ? 'filled' : 'outlined'}
                onClick={() => updateParam('cat', c.id)}
                sx={{ flexShrink: 0, bgcolor: activeCat === c.id ? undefined : 'background.paper' }}
              />
            ))}
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
