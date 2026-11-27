import type { Product } from '../types';
import { getPrice } from './format';

export type SortKey = 'default' | 'cheap' | 'expensive' | 'name';

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'default', label: 'По умолчанию' },
  { key: 'cheap', label: 'Сначала дешевле' },
  { key: 'expensive', label: 'Сначала дороже' },
  { key: 'name', label: 'По названию' },
];

/** Всё, что выбирается в поиске и панели фильтров. Хранится в адресе страницы (?q=&cat=&min=…). */
export interface Filters {
  q: string;
  cat: string | null;
  min: number | null;
  max: number | null;
  inStock: boolean;
  brands: string[];
  sort: SortKey;
}

export const EMPTY_FILTERS: Filters = {
  q: '',
  cat: null,
  min: null,
  max: null,
  inStock: false,
  brands: [],
  sort: 'default',
};

function toNumber(v: string | null): number | null {
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

export function parseFilters(params: URLSearchParams): Filters {
  const sort = params.get('sort') as SortKey | null;
  return {
    q: params.get('q') ?? '',
    cat: params.get('cat'),
    min: toNumber(params.get('min')),
    max: toNumber(params.get('max')),
    inStock: params.get('stock') === '1',
    brands: params.get('brand')?.split(',').filter(Boolean) ?? [],
    sort: sort && SORT_OPTIONS.some((o) => o.key === sort) ? sort : 'default',
  };
}

export function filtersToParams(f: Filters): URLSearchParams {
  const p = new URLSearchParams();
  if (f.q) p.set('q', f.q);
  if (f.cat) p.set('cat', f.cat);
  if (f.min !== null) p.set('min', String(f.min));
  if (f.max !== null) p.set('max', String(f.max));
  if (f.inStock) p.set('stock', '1');
  if (f.brands.length) p.set('brand', f.brands.join(','));
  if (f.sort !== 'default') p.set('sort', f.sort);
  return p;
}

/** Сколько фильтров включено (без текста поиска) — для значка на кнопке. */
export function countActiveFilters(f: Filters): number {
  return (
    (f.cat ? 1 : 0) +
    (f.min !== null || f.max !== null ? 1 : 0) +
    (f.inStock ? 1 : 0) +
    f.brands.length +
    (f.sort !== 'default' ? 1 : 0)
  );
}

/** Бренд берётся из характеристики «Бренд». Позже станет отдельным полем товара. */
export function getBrand(p: Product): string | undefined {
  return p.specs.find((s) => s.label === 'Бренд')?.value;
}

export function applyFilters(products: Product[], f: Filters): Product[] {
  const q = f.q.trim().toLowerCase();
  const list = products.filter((p) => {
    const price = getPrice(p) ?? 0;
    const brand = getBrand(p);
    return (
      (!q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)) &&
      (!f.cat || p.categoryId === f.cat) &&
      (f.min === null || price >= f.min) &&
      (f.max === null || price <= f.max) &&
      (!f.inStock || p.inStock) &&
      (!f.brands.length || (brand !== undefined && f.brands.includes(brand)))
    );
  });
  const price = (p: Product) => getPrice(p) ?? 0;
  if (f.sort === 'cheap') list.sort((a, b) => price(a) - price(b));
  if (f.sort === 'expensive') list.sort((a, b) => price(b) - price(a));
  if (f.sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
  return list;
}
