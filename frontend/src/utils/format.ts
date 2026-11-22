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

export const PHONE_PREFIX = '+996';

/**
 * Номер Кыргызстана без кода страны: 9 цифр, вид «555 52 52 52».
 * Понимает вставку полного номера (+996 555..., 0555...).
 */
export function formatPhoneLocal(input: string): string {
  let d = input.replace(/\D/g, '');
  if (d.length > 9 && d.startsWith('996')) d = d.slice(3);
  if (d.startsWith('0')) d = d.slice(1);
  d = d.slice(0, 9);
  return [d.slice(0, 3), d.slice(3, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean).join(' ');
}

export function isPhoneLocalValid(local: string): boolean {
  return local.replace(/\D/g, '').length === 9;
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
