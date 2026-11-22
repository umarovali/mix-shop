import { AppBar, Badge, Box, Chip, Container, IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBackIosNewRounded from '@mui/icons-material/ArrowBackIosNewRounded';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { IS_WHOLESALE } from '../config/mode';
import { HEADER_HEIGHT } from '../config/layout';
import { useCartCount } from '../store/cart';
import type { Store } from '../types';

/** Куда вести «Назад», если пользователь открыл страницу по прямой ссылке. */
function parentPath(pathname: string): string {
  const product = pathname.match(/^\/store\/([^/]+)\/product\//);
  if (product) return `/store/${product[1]}`;
  return '/';
}

export default function Header({ store }: { store?: Store }) {
  const location = useLocation();
  const navigate = useNavigate();
  const count = useCartCount();
  const isHome = location.pathname === '/';

  const goBack = () => {
    if (location.key !== 'default') navigate(-1);
    else navigate(parentPath(location.pathname));
  };

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}
    >
      <Container maxWidth="lg" disableGutters>
        <Toolbar disableGutters sx={{ gap: 1, px: { xs: 1, sm: 2 }, minHeight: HEADER_HEIGHT }}>
          {!isHome && (
            <IconButton onClick={goBack} aria-label="Назад">
              <ArrowBackIosNewRounded fontSize="small" />
            </IconButton>
          )}

          <Box
            component={RouterLink}
            to={store ? `/store/${store.id}` : '/'}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              flex: 1,
              minWidth: 0,
              color: 'inherit',
              textDecoration: 'none',
              pl: isHome ? 1 : 0,
            }}
          >
            <Box
              component="img"
              src={store ? store.icon : '/logos/mix-shop-plus.svg'}
              alt=""
              sx={{ width: 40, height: 40, objectFit: 'contain', flexShrink: 0 }}
            />
            <Box sx={{ minWidth: 0 }}>
              <Typography noWrap sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                {store ? store.name : 'Mix Shop'}
              </Typography>
              <Typography noWrap variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                {store ? store.tagline : 'Дом · Спорт · Здоровье'}
              </Typography>
            </Box>
          </Box>

          {IS_WHOLESALE && <Chip label="ОПТ" color="primary" size="small" sx={{ fontWeight: 700 }} />}

          <IconButton component={RouterLink} to="/cart" aria-label={`Корзина, позиций: ${count}`}>
            <Badge badgeContent={count} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
