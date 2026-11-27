import { useMemo, type ReactNode } from 'react';
import { Box, Chip, InputAdornment, Slider, Switch, TextField, Typography } from '@mui/material';
import CheckRounded from '@mui/icons-material/CheckRounded';
import { CARD_SHADOW } from '../theme';
import { CURRENCY } from '../config/site';
import type { Category, Product, Store } from '../types';
import { getPrice } from '../utils/format';
import { getBrand, SORT_OPTIONS, type Filters } from '../utils/filters';

interface Props {
  store: Store;
  products: Product[];
  categories: Category[];
  value: Filters;
  onChange: (patch: Partial<Filters>) => void;
  /** боковая колонка на компьютере: сортировка — в выпадающем списке, категории — в отдельном меню */
  showSort?: boolean;
  showCategories?: boolean;
}

/** Разделы фильтров. Используются в выезжающей панели и в боковой колонке на компьютере. */
export default function FilterPanel({
  store,
  products,
  categories,
  value,
  onChange,
  showSort = true,
  showCategories = true,
}: Props) {
  const prices = products.map((p) => getPrice(p) ?? 0);
  const priceMin = prices.length ? Math.min(...prices) : 0;
  const priceMax = prices.length ? Math.max(...prices) : 0;
  const brands = useMemo(
    () => [...new Set(products.map(getBrand).filter((b): b is string => !!b))].sort((a, b) => a.localeCompare(b)),
    [products],
  );

  const chip = (label: string, active: boolean, onClick: () => void, key?: string) => (
    <Chip
      key={key ?? label}
      label={label}
      clickable
      onClick={onClick}
      icon={active ? <CheckRounded /> : undefined}
      sx={{
        height: 34,
        px: 0.25,
        border: 'none',
        fontWeight: active ? 600 : 500,
        '& .MuiChip-icon': { color: 'inherit', fontSize: 18, ml: 0.75 },
        ...(active
          ? { color: '#FFFFFF', backgroundImage: store.colors.gradient, boxShadow: '0 3px 8px rgba(0,0,0,.12)' }
          : { bgcolor: 'background.paper', boxShadow: CARD_SHADOW }),
      }}
    />
  );

  const priceInput = (label: string, v: number | null, placeholder: number, key: 'min' | 'max') => (
    <TextField
      size="small"
      label={label}
      value={v ?? ''}
      placeholder={String(placeholder)}
      onChange={(e) => {
        const digits = e.target.value.replace(/\D/g, '');
        onChange({ [key]: digits ? Number(digits) : null });
      }}
      slotProps={{
        inputLabel: { shrink: true },
        input: { endAdornment: <InputAdornment position="end">{CURRENCY}</InputAdornment> },
        htmlInput: { inputMode: 'numeric' },
      }}
      sx={{
        '& .MuiOutlinedInput-root': { bgcolor: 'background.paper' },
        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
      }}
    />
  );

  return (
    <Box sx={{ display: 'grid', gap: 3, alignContent: 'start' }}>
      {showSort && (
        <Section title="Сортировка">
          {SORT_OPTIONS.map((o) => chip(o.label, value.sort === o.key, () => onChange({ sort: o.key }), o.key))}
        </Section>
      )}

      {showCategories && categories.length > 1 && (
        <Section title="Категория">
          {chip('Все', !value.cat, () => onChange({ cat: null }), 'all')}
          {categories.map((c) => chip(c.name, value.cat === c.id, () => onChange({ cat: c.id }), c.id))}
        </Section>
      )}

      {priceMax > priceMin && (
        <Box>
          <SectionTitle>Цена</SectionTitle>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
            {priceInput('От', value.min, priceMin, 'min')}
            {priceInput('До', value.max, priceMax, 'max')}
          </Box>
          <Box sx={{ px: 1.25, mt: 1 }}>
            <Slider
              value={[value.min ?? priceMin, value.max ?? priceMax]}
              min={priceMin}
              max={priceMax}
              step={Math.max(1, Math.round((priceMax - priceMin) / 100))}
              onChange={(_, v) => {
                const [a, b] = v as number[];
                onChange({ min: a === priceMin ? null : a, max: b === priceMax ? null : b });
              }}
              getAriaLabel={(i) => (i === 0 ? 'Цена от' : 'Цена до')}
              sx={{
                color: store.colors.primary,
                height: 4,
                '& .MuiSlider-thumb': { width: 22, height: 22, bgcolor: '#FFFFFF', border: '3px solid currentColor' },
              }}
            />
          </Box>
        </Box>
      )}

      <Box
        component="label"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'background.paper',
          boxShadow: CARD_SHADOW,
          borderRadius: 2,
          pl: 2,
          pr: 1,
          py: 1,
          cursor: 'pointer',
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 15 }}>Только в наличии</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 13 }}>
            Скрыть товары под заказ
          </Typography>
        </Box>
        <Switch
          checked={value.inStock}
          onChange={(e) => onChange({ inStock: e.target.checked })}
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': { color: store.colors.primary },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: store.colors.primary },
          }}
        />
      </Box>

      {brands.length > 1 && (
        <Section title="Бренд">
          {brands.map((b) => {
            const active = value.brands.includes(b);
            return chip(b, active, () =>
              onChange({ brands: active ? value.brands.filter((x) => x !== b) : [...value.brands, b] }),
            );
          })}
        </Section>
      )}
    </Box>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 1.25 }}>{children}</Typography>;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box>
      <SectionTitle>{title}</SectionTitle>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>{children}</Box>
    </Box>
  );
}
