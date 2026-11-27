import type { Category, Product, StoreId } from '../../types';

// Компактная запись тестовых товаров: одна строка — один товар.
// Позже всё это будет приходить с сервера (NestJS) и заполняться через админку.

export interface Extra {
  /** свои фото; без них карточка покажет иконку категории */
  images?: string[];
  /** false — «нет в наличии» */
  inStock?: boolean;
  /** своя оптовая цена и партия (иначе считаются от розничной) */
  wholesale?: number;
  minQty?: number;
  /** товар только в рознице (нет оптовой цены) */
  retailOnly?: boolean;
  /** постоянный id/артикул — для настоящих товаров */
  id?: string;
  sku?: string;
}

/** [название, бренд ('' — без бренда), розничная цена, описание, характеристики, доп.] */
export type Row = [name: string, brand: string, price: number, description: string, specs: Record<string, string>, extra?: Extra];

export interface CategoryDef {
  id: string;
  name: string;
  icon: string;
  /** префикс артикула, например 'TR' → TR-101, TR-102… */
  sku: string;
  rows: Row[];
}

/** Оптовая партия зависит от цены: дорогие товары — от 1 шт., мелочь — от 10. */
function defaultMinQty(price: number): number {
  if (price >= 30000) return 1;
  if (price >= 10000) return 2;
  if (price >= 3000) return 3;
  if (price >= 1000) return 5;
  return 10;
}

export function buildStore(storeId: StoreId, defs: CategoryDef[]): { categories: Category[]; products: Product[] } {
  const categories: Category[] = defs.map(({ id, name, icon }) => ({ id, storeId, name, icon }));
  const products: Product[] = defs.flatMap((def) =>
    def.rows.map(([name, brand, price, description, specs, extra = {}], i) => ({
      id: extra.id ?? `${def.id}-${i + 1}`,
      storeId,
      categoryId: def.id,
      name,
      sku: extra.sku ?? `${def.sku}-${101 + i}`,
      images: extra.images ?? [],
      description,
      specs: [
        ...(brand ? [{ label: 'Бренд', value: brand }] : []),
        ...Object.entries(specs).map(([label, value]) => ({ label, value })),
      ],
      retailPrice: price,
      wholesalePrice: extra.retailOnly ? undefined : (extra.wholesale ?? Math.round((price * 0.82) / 10) * 10),
      wholesaleMinQty: extra.minQty ?? defaultMinQty(price),
      inStock: extra.inStock ?? true,
    })),
  );
  return { categories, products };
}
