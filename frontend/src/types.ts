export type StoreId = 'plus' | 'sport' | 'med';

/** retail — розница (основной домен), wholesale — опт (поддомен opt.) */
export type SaleMode = 'retail' | 'wholesale';

export interface BrandColors {
  /** основной цвет: кнопки, активные элементы */
  primary: string;
  /** второй цвет бренда */
  secondary: string;
  /** светлый фон для плашек магазина */
  soft: string;
  /** градиент для кнопок и активных элементов */
  gradient: string;
  /** насыщенный градиент для баннеров и карточек магазина */
  hero: string;
}

export interface Store {
  id: StoreId;
  name: string;
  tagline: string;
  description: string;
  /** полный логотип с надписью */
  logo: string;
  /** значок без надписи — для шапки и карточек */
  icon: string;
  colors: BrandColors;
}

export interface Category {
  id: string;
  storeId: StoreId;
  name: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  storeId: StoreId;
  categoryId: string;
  name: string;
  sku: string;
  images: string[];
  description: string;
  specs: ProductSpec[];
  /** нет цены — товар не показывается в рознице */
  retailPrice?: number;
  /** нет цены — товар не показывается в опте */
  wholesalePrice?: number;
  /** минимальная партия для опта */
  wholesaleMinQty?: number;
  inStock: boolean;
}
