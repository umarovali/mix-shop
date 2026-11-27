import { useState } from 'react';
import { Box, Button, Chip, Container, Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import SearchOffRounded from '@mui/icons-material/SearchOffRounded';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from './SearchBar';
import SortSelect from './SortSelect';
import FilterSheet from './FilterSheet';
import FilterPanel from './FilterPanel';
import CategoryNav from './CategoryNav';
import ActiveFilterChips from './ActiveFilterChips';
import ProductGrid from './ProductGrid';
import { CARD_SHADOW } from '../theme';
import { HEADER_HEIGHT } from '../config/layout';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { isAvailableInMode, plural } from '../utils/format';
import {
  applyFilters,
  countActiveFilters,
  EMPTY_FILTERS,
  filtersToParams,
  parseFilters,
  type Filters,
} from '../utils/filters';
import type { Store } from '../types';

/** Высота прилипающей панели поиска на компьютере: отступ 12 + поле 46 + отступ 8. */
const SEARCH_BAR_HEIGHT = 66;
/** Боковая колонка прилипает под шапкой и панелью поиска. */
const SIDEBAR_TOP = HEADER_HEIGHT.sm + SEARCH_BAR_HEIGHT + 16;

const stickyBar = {
  position: 'sticky',
  top: HEADER_HEIGHT,
  zIndex: 2,
  bgcolor: 'rgba(243,244,248,.88)',
  backdropFilter: 'saturate(180%) blur(12px)',
} as const;

const scrollRow = {
  display: 'flex',
  gap: 1,
  py: 1,
  overflowX: 'auto',
  mx: { xs: -2, sm: -3 },
  px: { xs: 2, sm: 3 },
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
} as const;

interface Props {
  store: Store;
  /** store — страница магазина, search — отдельная страница поиска */
  variant: 'store' | 'search';
}

/**
 * Каталог магазина с поиском и фильтрами. Всё выбранное хранится в адресе (?q=&cat=&min=…).
 *
 * Телефон: в магазине первая буква поиска или «Показать N» в фильтрах открывают страницу поиска;
 *          фильтры — панелью снизу.
 * Планшет: поиск работает прямо на странице, рядом — сортировка; фильтры — панелью справа.
 * Компьютер: слева постоянная колонка с категориями и фильтрами, они применяются сразу.
 */
export default function StoreCatalog({ store, variant }: Props) {
  const theme = useTheme();
  const phone = useMediaQuery(theme.breakpoints.down('sm'));
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const isSearch = variant === 'search';
  const filters = parseFilters(params);
  const update = (f: Filters) => setParams(filtersToParams(f), { replace: true });
  const patch = (p: Partial<Filters>) => update({ ...filters, ...p });

  // На телефоне в магазине поиск и фильтры уводят на отдельную страницу поиска
  const leadsToSearch = phone && !isSearch;
  const openSearch = (f: Filters) => navigate(`/store/${store.id}/search?${filtersToParams(f)}`);

  const products = PRODUCTS.filter((p) => p.storeId === store.id && isAvailableInMode(p));
  const categories = CATEGORIES.filter((c) => c.storeId === store.id && products.some((p) => p.categoryId === c.id));
  const activeCount = countActiveFilters(filters);
  const query = filters.q.trim();
  // На странице поиска без запроса (телефон, планшет) показываем подсказки, а не весь каталог
  const showResults = !isSearch || desktop || query !== '' || activeCount > 0;
  const list = showResults ? applyFilters(products, filters) : [];
  const activeCat = categories.find((c) => c.id === filters.cat);
  const resetFilters = () => update({ ...EMPTY_FILTERS, q: filters.q, cat: filters.cat, sort: filters.sort });

  const title = activeCat?.name ?? (query ? `Поиск: «${query}»` : 'Все товары');
  const found = `${list.length} ${plural(list.length, ['товар', 'товара', 'товаров'])}`;

  return (
    <>
      {/* Поиск (+ сортировка на планшете и компьютере) — прилипает под шапкой */}
      <Box sx={stickyBar}>
        <Container maxWidth="lg" sx={{ pt: 1.5, pb: 1 }}>
          <Box sx={{ display: 'flex', gap: { sm: 1.5 } }}>
            <SearchBar
              store={store}
              value={leadsToSearch ? '' : filters.q}
              autoFocus={isSearch}
              onChange={(q) => (leadsToSearch ? q && openSearch({ ...filters, q }) : patch({ q }))}
              onFilterClick={() => setFiltersOpen(true)}
              filterCount={activeCount - (phone ? 0 : filters.sort !== 'default' ? 1 : 0)}
              showFilter={!desktop}
            />
            {!phone && <SortSelect value={filters.sort} onChange={(sort) => patch({ sort })} />}
          </Box>

          {/* Телефон и планшет: заголовок каталога и категории чипами */}
          {!desktop && !isSearch && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1.5 }}>
                <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: 17, sm: 19 } }}>
                  Каталог
                </Typography>
                <Box
                  component={RouterLink}
                  to={`/store/${store.id}/catalog`}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    py: 0.5,
                    pl: 1.25,
                    pr: 0.5,
                    borderRadius: '999px',
                    color: store.colors.primary,
                    bgcolor: store.colors.soft,
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 600,
                    WebkitTapHighlightColor: 'transparent',
                    '& .chevron': { transition: 'transform .25s cubic-bezier(.22, 1, .36, 1)' },
                    '&:hover .chevron': { transform: 'translateX(3px)' },
                  }}
                >
                  Все категории
                  <ChevronRightRounded className="chevron" sx={{ fontSize: 18, ml: 0.25 }} />
                </Box>
              </Box>
              {/* Вертикальные отступы внутри прокрутки нужны, чтобы тени чипов не обрезались */}
              <Box sx={scrollRow}>
                {[{ id: null, name: 'Все' }, ...categories].map((c) => {
                  const active = filters.cat === c.id;
                  return (
                    <Chip
                      key={c.id ?? 'all'}
                      label={c.name}
                      clickable
                      onClick={() => patch({ cat: c.id })}
                      sx={{
                        flexShrink: 0,
                        height: 36,
                        px: 0.5,
                        border: 'none',
                        ...(active
                          ? {
                              color: '#FFFFFF',
                              backgroundImage: store.colors.gradient,
                              boxShadow: '0 3px 8px rgba(0,0,0,.12)',
                            }
                          : { bgcolor: 'background.paper', boxShadow: CARD_SHADOW }),
                      }}
                    />
                  );
                })}
              </Box>
            </>
          )}

          {!desktop && (
            <ActiveFilterChips
              store={store}
              filters={filters}
              categories={categories}
              onChange={update}
              hideCategory={!isSearch}
              hideSort={!phone}
              scroll
            />
          )}
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pt: { xs: 1.5, md: 2 } }}>
        <Box
          sx={{
            display: { md: 'grid' },
            gridTemplateColumns: { md: '250px minmax(0, 1fr)', lg: '270px minmax(0, 1fr)' },
            gap: { md: 3, lg: 4 },
            alignItems: 'start',
          }}
        >
          {/* Компьютер: боковая колонка — категории и фильтры, применяются сразу */}
          {desktop && (
            <Box
              component="aside"
              sx={{
                position: 'sticky',
                top: SIDEBAR_TOP,
                maxHeight: `calc(100dvh - ${SIDEBAR_TOP + 16}px)`,
                overflowY: 'auto',
                mx: -1,
                px: 1,
                pb: 2,
              }}
            >
              <SidebarTitle>Категории</SidebarTitle>
              <CategoryNav
                store={store}
                categories={categories}
                products={products}
                active={filters.cat}
                onSelect={(cat) => patch({ cat })}
              />
              <Divider sx={{ my: 2.5 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <SidebarTitle sx={{ mb: 0 }}>Фильтры</SidebarTitle>
                {(filters.min !== null || filters.max !== null || filters.inStock || filters.brands.length > 0) && (
                  <Button size="small" onClick={resetFilters} sx={{ minHeight: 0, py: 0.25, fontSize: 13 }}>
                    Сбросить
                  </Button>
                )}
              </Box>
              <FilterPanel
                store={store}
                products={products}
                categories={categories}
                value={filters}
                onChange={patch}
                showSort={false}
                showCategories={false}
              />
            </Box>
          )}

          <Box sx={{ minWidth: 0 }}>
            {/* Компьютер: заголовок раздела, число товаров и выбранные фильтры */}
            {desktop && (
              <Box sx={{ mb: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, flexWrap: 'wrap' }}>
                  <Typography component="h2" sx={{ fontWeight: 800, fontSize: 26, lineHeight: 1.2 }}>
                    {title}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: 15 }}>{found}</Typography>
                </Box>
                <Box sx={{ mt: 1.5, '&:empty': { display: 'none' } }}>
                  <ActiveFilterChips
                    store={store}
                    filters={filters}
                    categories={categories}
                    onChange={update}
                    hideCategory
                    hideSort
                  />
                </Box>
              </Box>
            )}

            {!showResults ? (
              // Страница поиска без запроса: быстрый переход в категории
              <Box sx={{ pt: 1 }}>
                <Typography sx={{ fontWeight: 700, mb: 1.5 }}>Категории</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {categories.map((c) => (
                    <Chip
                      key={c.id}
                      label={c.name}
                      clickable
                      onClick={() => patch({ cat: c.id })}
                      sx={{ height: 36, border: 'none', bgcolor: 'background.paper', boxShadow: CARD_SHADOW }}
                    />
                  ))}
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 3 }}>
                  Введите название или артикул товара, например «корсет» или «ST-2223»
                </Typography>
              </Box>
            ) : list.length > 0 ? (
              <>
                {!desktop && (
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
                    Найдено: {found}
                  </Typography>
                )}
                <ProductGrid products={list} withSidebar={desktop} />
              </>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <SearchOffRounded sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
                <Typography sx={{ fontWeight: 600, mb: 1 }}>Ничего не найдено</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                  Попробуйте изменить запрос или снять часть фильтров
                </Typography>
                <Button variant="outlined" onClick={() => update({ ...EMPTY_FILTERS, q: filters.q })}>
                  Сбросить фильтры
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      <FilterSheet
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        store={store}
        products={products}
        categories={categories}
        value={filters}
        onApply={leadsToSearch ? openSearch : update}
      />
    </>
  );
}

function SidebarTitle({ children, sx }: { children: string; sx?: object }) {
  return (
    <Typography
      sx={{
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '.06em',
        textTransform: 'uppercase',
        color: 'text.secondary',
        mb: 1,
        px: 1,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}
