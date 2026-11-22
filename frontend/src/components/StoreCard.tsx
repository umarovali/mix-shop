import { Box, Card, CardActionArea, Typography } from '@mui/material';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import { Link as RouterLink } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { isAvailableInMode, plural } from '../utils/format';
import type { Store } from '../types';

/** Карточка магазина на главной: на телефоне — горизонтальная, на компьютере — вертикальная. */
export default function StoreCard({ store }: { store: Store }) {
  const count = PRODUCTS.filter((p) => p.storeId === store.id && isAvailableInMode(p)).length;

  return (
    <Card
      sx={{
        borderRadius: '20px',
        transition: 'box-shadow .2s, transform .2s',
        '&:hover': { boxShadow: '0 10px 30px rgba(0,0,0,.08)', transform: 'translateY(-2px)' },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={`/store/${store.id}`}
        sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, alignItems: 'stretch', height: '100%' }}
      >
        <Box
          sx={{
            bgcolor: store.colors.soft,
            display: 'grid',
            placeItems: 'center',
            flexShrink: 0,
            width: { xs: 116, sm: 140, md: '100%' },
            py: { xs: 2, md: 4 },
          }}
        >
          <Box
            component="img"
            src={store.icon}
            alt=""
            sx={{ width: { xs: 84, sm: 100, md: 160 }, height: { xs: 84, sm: 100, md: 160 }, objectFit: 'contain' }}
          />
        </Box>
        <Box sx={{ p: { xs: 2, md: 3 }, flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography component="h2" sx={{ fontWeight: 700, fontSize: { xs: 18, md: 20 } }}>
            {store.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {store.description}
          </Typography>
          <Box
            sx={{
              mt: 'auto',
              pt: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: store.colors.primary,
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            <span>
              {count} {plural(count, ['товар', 'товара', 'товаров'])}
            </span>
            <ArrowForwardRounded fontSize="small" />
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}
