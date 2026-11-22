import { Box, Card, CardActionArea, Typography } from '@mui/material';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import { Link as RouterLink } from 'react-router-dom';
import LogoBadge from './LogoBadge';
import Decor from './Decor';
import { PRODUCTS } from '../data/products';
import { isAvailableInMode, plural } from '../utils/format';
import type { Store } from '../types';

/** Цветная карточка магазина: на телефоне — горизонтальная, на компьютере — вертикальная. */
export default function StoreCard({ store }: { store: Store }) {
  const count = PRODUCTS.filter((p) => p.storeId === store.id && isAvailableInMode(p)).length;

  return (
    <Card
      sx={{
        borderRadius: '24px',
        backgroundImage: store.colors.hero,
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(20,20,43,.16)',
        transition: 'box-shadow .25s, transform .25s',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 18px 40px rgba(20,20,43,.24)' },
      }}
    >
      <Decor accent={store.id === 'plus' ? 'rgba(232,20,27,.55)' : 'rgba(255,255,255,.14)'} />
      <CardActionArea
        component={RouterLink}
        to={`/store/${store.id}`}
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: { xs: 'row', md: 'column' },
          alignItems: { xs: 'center', md: 'flex-start' },
          gap: { xs: 2, md: 3 },
          p: { xs: 2.25, md: 3.5 },
          height: '100%',
        }}
      >
        <LogoBadge src={store.icon} size={{ xs: 76, sm: 88, md: 112 }} />

        <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignSelf: 'stretch' }}>
          <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: 19, md: 24 }, lineHeight: 1.2 }}>
            {store.name}
          </Typography>
          <Typography sx={{ fontSize: { xs: 13, md: 14 }, opacity: 0.88, mt: 0.5 }}>{store.description}</Typography>

          <Box sx={{ mt: 'auto', pt: { xs: 1.5, md: 3 }, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box
              sx={{
                px: 1.25,
                py: 0.5,
                borderRadius: '999px',
                bgcolor: 'rgba(255,255,255,.18)',
                backdropFilter: 'blur(4px)',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {count} {plural(count, ['товар', 'товара', 'товаров'])}
            </Box>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                bgcolor: '#FFFFFF',
                color: store.colors.primary,
                display: 'grid',
                placeItems: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,.15)',
              }}
            >
              <ArrowForwardRounded fontSize="small" />
            </Box>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}
