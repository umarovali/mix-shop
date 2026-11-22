import { CURRENCY } from '../config/site';
import { IS_WHOLESALE } from '../config/mode';
import type { Product } from '../types';

const numberFormat = new Intl.NumberFormat('ru-RU');

export function formatPrice(value: number): string {
  return `${numberFormat.format(value)} ${CURRENCY}`;
}

/** Цена товара в текущем режиме (опт/розница). undefined — товар в этом режиме не продаётся. */
export function getPrice(product: Product): number | undefined {
  return IS_WHOLESALE ? product.wholesalePrice : product.retailPrice;
}

export function getMinQty(product: Product): number {
  return IS_WHOLESALE ? Math.max(1, product.wholesaleMinQty ?? 1) : 1;
}

export function isAvailableInMode(product: Product): boolean {
  return getPrice(product) !== undefined;
}

/** plural(5, ['товар', 'товара', 'товаров']) → 'товаров' */
export function plural(n: number, forms: [string, string, string]): string {
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return forms[2];
  if (b > 1 && b < 5) return forms[1];
  if (b === 1) return forms[0];
  return forms[2];
}
