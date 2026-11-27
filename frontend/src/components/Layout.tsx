import { useMemo } from 'react';
import { Outlet, ScrollRestoration, useLocation, useMatch } from 'react-router-dom';
import { enter, fadeIn } from '../utils/animations';
import { Box, CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Header from './Header';
import Footer from './Footer';
import { getStore } from '../data/stores';
import { createAppTheme } from '../theme';

/** Общий каркас. Внутри магазина тема перекрашивается в его фирменные цвета. */
export default function Layout() {
  const location = useLocation();
  const match = useMatch('/store/:storeId/*');
  const store = getStore(match?.params.storeId);
  const theme = useMemo(() => createAppTheme(store?.colors), [store]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={(t) => {
          const thumb = alpha(t.palette.primary.main, 0.35);
          const thumbHover = alpha(t.palette.primary.main, 0.6);
          return {
            // Chrome, Edge, Safari: тонкая полоса, скруглённый ползунок в цвет магазина, без стрелок.
            // Стандартные scrollbar-width/color здесь не задаём — в Chrome они отключают эти стили.
            '*::-webkit-scrollbar': { width: 10, height: 10 },
            '*::-webkit-scrollbar-track': { background: 'transparent' },
            '*::-webkit-scrollbar-thumb': {
              backgroundColor: thumb,
              borderRadius: 999,
              // прозрачная рамка = отступ от краёв, ползунок выглядит тоньше
              border: '3px solid transparent',
              backgroundClip: 'content-box',
            },
            '*::-webkit-scrollbar-thumb:hover': { backgroundColor: thumbHover },
            '*::-webkit-scrollbar-button': { display: 'none', width: 0, height: 0 },
            '*::-webkit-scrollbar-corner': { background: 'transparent' },
            // Firefox понимает только стандартные свойства
            '@supports (-moz-appearance: none)': {
              '*': { scrollbarWidth: 'thin', scrollbarColor: `${thumb} transparent` },
            },
            // Главная прокрутка страницы — без видимой полосы (колесо, тачпад и палец работают как обычно).
            // Полосы внутри блоков (боковая колонка, панели) остаются.
            html: { scrollbarWidth: 'none' },
            'html::-webkit-scrollbar, body::-webkit-scrollbar': { display: 'none', width: 0, height: 0 },
          };
        }}
      />
      <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
        <Header store={store} />
        {/* key по адресу — при переходе между страницами новая страница плавно проявляется */}
        <Box component="main" key={location.pathname} sx={{ flex: 1, ...enter(0, fadeIn, 0.35) }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
      <ScrollRestoration />
    </ThemeProvider>
  );
}
