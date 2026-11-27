import { useState } from 'react';
import { Box, Button, Drawer, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import CloseRounded from '@mui/icons-material/CloseRounded';
import FilterPanel from './FilterPanel';
import type { Category, Product, Store } from '../types';
import { plural } from '../utils/format';
import { applyFilters, type Filters } from '../utils/filters';

interface Props {
  open: boolean;
  onClose: () => void;
  store: Store;
  /** все товары магазина в текущем режиме — из них считаются цены, бренды и «Показать N» */
  products: Product[];
  categories: Category[];
  value: Filters;
  onApply: (filters: Filters) => void;
}

/**
 * Панель фильтров: снизу на телефоне, справа на планшете и компьютере.
 * Выбор копится в черновике и применяется кнопкой «Показать N товаров».
 */
export default function FilterSheet({ open, onClose, store, products, categories, value, onApply }: Props) {
  const theme = useTheme();
  const side = useMediaQuery(theme.breakpoints.up('sm'));
  const [draft, setDraft] = useState<Filters>(value);
  const [wasOpen, setWasOpen] = useState(open);

  // при каждом открытии начинаем с того, что уже применено
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setDraft(value);
  }

  const resultCount = applyFilters(products, draft).length;
  const reset = () =>
    setDraft({ ...draft, cat: null, min: null, max: null, inStock: false, brands: [], sort: 'default' });

  return (
    <Drawer
      anchor={side ? 'right' : 'bottom'}
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            bgcolor: '#F3F4F8',
            display: 'flex',
            flexDirection: 'column',
            ...(side
              ? { width: 420, maxWidth: '90vw', borderRadius: '24px 0 0 24px' }
              : { maxHeight: '88dvh', borderRadius: '24px 24px 0 0' }),
          },
        },
      }}
    >
      {/* Шапка панели */}
      <Box sx={{ px: 2.5, pt: side ? 2.5 : 1, pb: 1.5 }}>
        {!side && (
          <Box sx={{ width: 40, height: 4, borderRadius: 2, bgcolor: 'rgba(20,20,43,.15)', mx: 'auto', mb: 1.5 }} />
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ fontWeight: 800, fontSize: 20 }}>Фильтры</Typography>
          <IconButton aria-label="Закрыть" onClick={onClose} sx={{ mr: -1 }}>
            <CloseRounded />
          </IconButton>
        </Box>
      </Box>

      {/* Разделы — прокручиваются, кнопки снизу всегда видны */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: 2.5, pb: 2 }}>
        <FilterPanel
          store={store}
          products={products}
          categories={categories}
          value={draft}
          onChange={(patch) => setDraft((d) => ({ ...d, ...patch }))}
        />
      </Box>

      {/* Кнопки */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: 1.5,
          px: 2.5,
          pt: 1.5,
          pb: 'calc(16px + env(safe-area-inset-bottom))',
          bgcolor: 'background.paper',
          boxShadow: '0 -4px 16px rgba(20,20,43,.06)',
        }}
      >
        <Button variant="text" onClick={reset} sx={{ color: 'text.secondary', px: 2 }}>
          Сбросить
        </Button>
        <Button
          variant="contained"
          disabled={resultCount === 0}
          onClick={() => {
            onApply(draft);
            onClose();
          }}
          sx={{ height: 48 }}
        >
          {resultCount
            ? `Показать ${resultCount} ${plural(resultCount, ['товар', 'товара', 'товаров'])}`
            : 'Ничего не найдено'}
        </Button>
      </Box>
    </Drawer>
  );
}
