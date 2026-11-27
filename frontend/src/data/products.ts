import type { Category, Product } from '../types';
import { MED } from './catalog/med';
import { SPORT } from './catalog/sport';
import { PLUS } from './catalog/plus';

// ВНИМАНИЕ: тестовые данные для вёрстки (каталоги по магазинам — в ./catalog).
// Реальные товары с фото: дорожки Q6 и мобильная, массажное кресло, корсет, бутылочки, трости, коляска, тонометр.
// Остальные цены и названия условные. Позже всё это будет приходить с сервера (NestJS) и заполняться через админку.

export const CATEGORIES: Category[] = [...MED.categories, ...SPORT.categories, ...PLUS.categories];

export const PRODUCTS: Product[] = [...MED.products, ...SPORT.products, ...PLUS.products];

export function getProduct(id: string | undefined): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getCategory(id: string | undefined): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
