import { Alert, Box, Container, Typography } from '@mui/material';
import StoreCard from '../components/StoreCard';
import { STORES } from '../data/stores';
import { IS_WHOLESALE } from '../config/mode';

export default function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
      <Typography component="h1" sx={{ fontWeight: 700, fontSize: { xs: 26, md: 36 }, lineHeight: 1.2 }}>
        Выберите магазин
      </Typography>
      <Typography sx={{ color: 'text.secondary', mt: 1, mb: 3, maxWidth: 560 }}>
        Три магазина в одном месте. Соберите корзину — заказ отправится нам в WhatsApp.
      </Typography>

      {IS_WHOLESALE && (
        <Alert severity="info" sx={{ mb: 3, borderRadius: '12px' }}>
          Вы на оптовом сайте. Цены оптовые, минимальная партия указана у каждого товара.
        </Alert>
      )}

      <Box sx={{ display: 'grid', gap: { xs: 2, md: 3 }, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
        {STORES.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </Box>
    </Container>
  );
}
