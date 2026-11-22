import { Box, Container, Typography } from '@mui/material';
import WhatsApp from '@mui/icons-material/WhatsApp';
import StorefrontRounded from '@mui/icons-material/StorefrontRounded';
import LocalOfferRounded from '@mui/icons-material/LocalOfferRounded';
import StoreCard from '../components/StoreCard';
import Decor from '../components/Decor';
import { STORES } from '../data/stores';
import { IS_WHOLESALE } from '../config/mode';
import { DEFAULT_COLORS, CARD_SHADOW } from '../theme';
import { enter, stagger } from '../utils/animations';

const FEATURES = [
  { icon: StorefrontRounded, title: 'Три магазина', text: 'Дом, спорт и здоровье в одном месте' },
  { icon: LocalOfferRounded, title: 'Розница и опт', text: 'Отдельные цены для розницы и опта' },
  { icon: WhatsApp, title: 'Заказ в WhatsApp', text: 'Без регистрации, за пару минут' },
];

export default function HomePage() {
  return (
    <>
      {/* Баннер */}
      <Box sx={{ backgroundImage: DEFAULT_COLORS.hero, color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
        <Decor accent="rgba(232,20,27,.6)" />
        <Box
          sx={{
            position: 'absolute',
            width: 320,
            height: 320,
            left: '45%',
            top: -200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(31,169,183,.35) 0%, rgba(31,169,183,0) 70%)',
            pointerEvents: 'none',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', pt: { xs: 4, md: 7 }, pb: { xs: 9, md: 12 } }}>
          {IS_WHOLESALE && (
            <Box
              sx={{
                display: 'inline-block',
                mb: 1.5,
                px: 1.5,
                py: 0.5,
                borderRadius: '999px',
                backgroundImage: DEFAULT_COLORS.gradient,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '.08em',
              }}
            >
              ОПТОВЫЙ САЙТ
            </Box>
          )}
          <Typography
            component="h1"
            sx={{ fontWeight: 800, fontSize: { xs: 30, sm: 38, md: 52 }, lineHeight: 1.1, ...enter(0.05) }}
          >
            Всё нужное —{' '}
            <Box component="span" sx={{ color: '#FF4A4F', whiteSpace: 'nowrap' }}>
              в одном месте
            </Box>
          </Typography>
          <Typography sx={{ mt: 1.5, maxWidth: 520, fontSize: { xs: 15, md: 18 }, opacity: 0.85, ...enter(0.15) }}>
            {IS_WHOLESALE
              ? 'Оптовые цены на товары для дома, спорта и здоровья. Минимальная партия указана у каждого товара.'
              : 'Товары для дома, спорта и здоровья. Выберите магазин, соберите корзину и отправьте заказ в WhatsApp.'}
          </Typography>
        </Container>
      </Box>

      {/* Магазины — карточки «наезжают» на баннер */}
      <Container maxWidth="lg" sx={{ mt: { xs: -6, md: -8 }, position: 'relative' }}>
        <Box sx={{ display: 'grid', gap: { xs: 2, md: 3 }, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
          {STORES.map((store, i) => (
            <Box key={store.id} sx={{ display: 'grid', ...enter(stagger(i, 0.25, 0.12)) }}>
              <StoreCard store={store} />
            </Box>
          ))}
        </Box>

        {/* Преимущества */}
        <Box
          sx={{
            mt: { xs: 3, md: 5 },
            display: 'grid',
            gap: { xs: 1.5, md: 3 },
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          }}
        >
          {FEATURES.map(({ icon: Icon, title, text }, i) => (
            <Box
              key={title}
              sx={{
                ...enter(stagger(i, 0.6, 0.08)),
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: '18px',
                boxShadow: CARD_SHADOW,
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  flexShrink: 0,
                  borderRadius: '14px',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#FFFFFF',
                  backgroundImage: DEFAULT_COLORS.gradient,
                  boxShadow: '0 6px 14px rgba(232,20,27,.3)',
                }}
              >
                <Icon fontSize="small" />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 15 }}>{title}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {text}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
}
