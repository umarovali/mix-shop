import { Box, ButtonBase, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import AppsRounded from '@mui/icons-material/AppsRounded';
import { getCategoryIcon } from '../config/categoryIcons';
import type { Category, Product, Store } from '../types';

interface Props {
  store: Store;
  categories: Category[];
  products: Product[];
  active: string | null;
  onSelect: (id: string | null) => void;
}

/** Список категорий для боковой колонки на компьютере: иконка, название, количество. */
export default function CategoryNav({ store, categories, products, active, onSelect }: Props) {
  const items = [
    { id: null, name: 'Все товары', Icon: AppsRounded, count: products.length },
    ...categories.map((c) => ({
      id: c.id as string | null,
      name: c.name,
      Icon: getCategoryIcon(c.icon),
      count: products.filter((p) => p.categoryId === c.id).length,
    })),
  ];

  return (
    <Box component="nav" aria-label="Категории" sx={{ display: 'grid', gap: 0.25 }}>
      {items.map(({ id, name, Icon, count }) => {
        const selected = active === id;
        return (
          <ButtonBase
            key={id ?? 'all'}
            onClick={() => onSelect(id)}
            aria-current={selected ? 'true' : undefined}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              px: 1,
              py: 0.75,
              borderRadius: 2,
              textAlign: 'left',
              justifyContent: 'flex-start',
              bgcolor: selected ? 'background.paper' : 'transparent',
              boxShadow: selected ? `0 4px 14px ${alpha(store.colors.primary, 0.14)}` : 'none',
              transition: 'background-color .2s, box-shadow .2s',
              '&:hover': { bgcolor: selected ? 'background.paper' : alpha(store.colors.primary, 0.06) },
              '&:hover .cat-icon': { transform: 'scale(1.06)' },
            }}
          >
            <Box
              className="cat-icon"
              sx={{
                width: 34,
                height: 34,
                flexShrink: 0,
                borderRadius: '10px',
                display: 'grid',
                placeItems: 'center',
                transition: 'transform .25s cubic-bezier(.22, 1, .36, 1)',
                ...(selected
                  ? { color: '#FFFFFF', backgroundImage: store.colors.gradient }
                  : { color: store.colors.primary, bgcolor: alpha(store.colors.primary, 0.08) }),
              }}
            >
              <Icon sx={{ fontSize: 20 }} />
            </Box>
            <Typography
              sx={{
                flex: 1,
                minWidth: 0,
                fontSize: 14,
                fontWeight: selected ? 700 : 500,
                lineHeight: 1.25,
                color: selected ? 'text.primary' : '#3A3A44',
              }}
            >
              {name}
            </Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: selected ? store.colors.primary : 'text.disabled' }}>
              {count}
            </Typography>
          </ButtonBase>
        );
      })}
    </Box>
  );
}
