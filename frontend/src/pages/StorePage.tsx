import { Box, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import StoreCatalog from '../components/StoreCatalog';
import LogoBadge from '../components/LogoBadge';
import Decor from '../components/Decor';
import { enter, zoomIn } from '../utils/animations';
import { getStore } from '../data/stores';
import NotFoundPage from './NotFoundPage';

export default function StorePage() {
  const store = getStore(useParams().storeId);
  if (!store) return <NotFoundPage />;

  return (
    <>
      {/* Цветной баннер магазина */}
      <Box sx={{ backgroundImage: store.colors.hero, color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
        <Decor accent={store.id === 'plus' ? 'rgba(232,20,27,.55)' : 'rgba(255,255,255,.14)'} />
        <Container
          maxWidth="lg"
          sx={{ position: 'relative', py: { xs: 3, md: 4 }, display: 'flex', alignItems: 'center', gap: { xs: 2, md: 3 } }}
        >
          <Box sx={enter(0.05, zoomIn, 0.55)}>
            <LogoBadge src={store.icon} size={{ xs: 72, md: 96 }} />
          </Box>
          <Box sx={{ minWidth: 0, ...enter(0.12) }}>
            <Typography component="h1" sx={{ fontWeight: 800, fontSize: { xs: 24, sm: 30, md: 36 }, lineHeight: 1.15 }}>
              {store.name}
            </Typography>
            <Typography sx={{ fontSize: { xs: 13, md: 16 }, opacity: 0.88, mt: 0.5 }}>{store.description}</Typography>
          </Box>
        </Container>
      </Box>

      <StoreCatalog store={store} variant="store" />
    </>
  );
}
