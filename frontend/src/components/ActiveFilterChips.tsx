import { Box, Chip } from '@mui/material';
import { CARD_SHADOW } from '../theme';
import type { Category, Store } from '../types';
import { formatPrice } from '../utils/format';
import { EMPTY_FILTERS, SORT_OPTIONS, type Filters } from '../utils/filters';

interface Props {
  store: Store;
  filters: Filters;
  categories: Category[];
  onChange: (f: Filters) => void;
  /** категория уже видна в чипах/меню категорий — не дублировать */
  hideCategory?: boolean;
  /** сортировка видна в выпадающем списке — не дублировать */
  hideSort?: boolean;
  /** true — одной прокручиваемой строкой (телефон), false — с переносом */
  scroll?: boolean;
}

/** Выбранные фильтры чипами с крестиком — снимаются по одному. */
export default function ActiveFilterChips({ store, filters, categories, onChange, hideCategory, hideSort, scroll }: Props) {
  const chips: { key: string; label: string; next: Filters }[] = [];
  if (filters.cat && !hideCategory) {
    const name = categories.find((c) => c.id === filters.cat)?.name ?? 'Категория';
    chips.push({ key: 'cat', label: name, next: { ...filters, cat: null } });
  }
  if (filters.min !== null || filters.max !== null) {
    const label =
      filters.min !== null && filters.max !== null
        ? `${formatPrice(filters.min)} – ${formatPrice(filters.max)}`
        : filters.min !== null
          ? `от ${formatPrice(filters.min)}`
          : `до ${formatPrice(filters.max!)}`;
    chips.push({ key: 'price', label, next: { ...filters, min: null, max: null } });
  }
  if (filters.inStock) chips.push({ key: 'stock', label: 'В наличии', next: { ...filters, inStock: false } });
  filters.brands.forEach((b) =>
    chips.push({ key: `brand-${b}`, label: b, next: { ...filters, brands: filters.brands.filter((x) => x !== b) } }),
  );
  if (filters.sort !== 'default' && !hideSort) {
    const label = SORT_OPTIONS.find((o) => o.key === filters.sort)!.label;
    chips.push({ key: 'sort', label, next: { ...filters, sort: 'default' } });
  }

  if (!chips.length) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        ...(scroll
          ? {
              py: 1.25,
              overflowX: 'auto',
              mx: { xs: -2, sm: -3 },
              px: { xs: 2, sm: 3 },
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }
          : { flexWrap: 'wrap' }),
      }}
    >
      {chips.map((c) => (
        <Chip
          key={c.key}
          label={c.label}
          onDelete={() => onChange(c.next)}
          sx={{
            flexShrink: 0,
            height: 34,
            border: 'none',
            color: store.colors.primary,
            bgcolor: store.colors.soft,
            fontWeight: 600,
            '& .MuiChip-deleteIcon': { color: 'inherit', opacity: 0.7, '&:hover': { opacity: 1, color: 'inherit' } },
          }}
        />
      ))}
      {chips.length > 1 && (
        <Chip
          label="Сбросить все"
          clickable
          onClick={() =>
            onChange({
              ...EMPTY_FILTERS,
              q: filters.q,
              cat: hideCategory ? filters.cat : null,
              sort: hideSort ? filters.sort : 'default',
            })
          }
          sx={{ flexShrink: 0, height: 34, border: 'none', bgcolor: 'background.paper', boxShadow: CARD_SHADOW }}
        />
      )}
    </Box>
  );
}
