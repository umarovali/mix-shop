import { useMemo } from 'react';
import { Outlet, ScrollRestoration, useMatch } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { getStore } from '../data/stores';
import { createAppTheme } from '../theme';

/** Общий каркас. Внутри магазина тема перекрашивается в его фирменные цвета. */
export default function Layout() {
  const match = useMatch('/store/:storeId/*');
  const store = getStore(match?.params.storeId);
  const theme = useMemo(() => createAppTheme(store?.colors), [store]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
        <Header store={store} />
        <Box component="main" sx={{ flex: 1 }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
      <ScrollRestoration />
    </ThemeProvider>
  );
}
