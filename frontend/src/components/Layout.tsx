import { useMemo } from 'react';
import { Outlet, ScrollRestoration, useLocation, useMatch } from 'react-router-dom';
import { enter, fadeIn } from '../utils/animations';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
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
