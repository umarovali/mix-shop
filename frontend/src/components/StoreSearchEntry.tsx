import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import FilterSheet from './FilterSheet';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { isAvailableInMode } from '../utils/format';
import { EMPTY_FILTERS, filtersToParams, type Filters } from '../utils/filters';
import type { Store } from '../types';

/**
 * Поиск + фильтры на страницах магазина и каталога.
 * Первая же буква или «Показать N товаров» в фильтрах открывают страницу поиска.
 */
export default function StoreSearchEntry({ store, cat = null }: { store: Store; cat?: string | null }) {
  const navigate = useNavigate();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const products = PRODUCTS.filter((p) => p.storeId === store.id && isAvailableInMode(p));
  const categories = CATEGORIES.filter((c) => c.storeId === store.id && products.some((p) => p.categoryId === c.id));
  const current: Filters = { ...EMPTY_FILTERS, cat };

  const openSearch = (f: Filters) => navigate(`/store/${store.id}/search?${filtersToParams(f)}`);

  return (
    <>
      <SearchBar
        store={store}
        value=""
        onChange={(q) => q && openSearch({ ...current, q })}
        onFilterClick={() => setFiltersOpen(true)}
      />
      <FilterSheet
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        store={store}
        products={products}
        categories={categories}
        value={current}
        onApply={openSearch}
      />
    </>
  );
}
