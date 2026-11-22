import { STORES } from '../data/stores';
import { IS_WHOLESALE } from '../config/mode';
import { WHATSAPP_NUMBER } from '../config/site';
import { formatPrice, getPrice } from './format';
import type { Product } from '../types';

export interface CartLine {
  product: Product;
  qty: number;
}

export interface Customer {
  name: string;
  phone: string;
  comment: string;
}

export function cartTotal(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + (getPrice(l.product) ?? 0) * l.qty, 0);
}

/** Текст заказа: товары сгруппированы по магазинам. */
export function buildOrderMessage(lines: CartLine[], customer: Customer): string {
  const out: string[] = [`Здравствуйте! Новый заказ — ${IS_WHOLESALE ? 'ОПТ' : 'РОЗНИЦА'}`, ''];

  for (const store of STORES) {
    const storeLines = lines.filter((l) => l.product.storeId === store.id);
    if (!storeLines.length) continue;
    out.push(`*${store.name}*`);
    storeLines.forEach((l, i) => {
      const price = getPrice(l.product) ?? 0;
      out.push(
        `${i + 1}. ${l.product.name} (арт. ${l.product.sku})`,
        `   ${l.qty} шт. × ${formatPrice(price)} = ${formatPrice(price * l.qty)}`,
      );
    });
    out.push('');
  }

  out.push(`*Итого: ${formatPrice(cartTotal(lines))}*`, '');
  out.push(`Имя: ${customer.name.trim()}`, `Телефон: ${customer.phone.trim()}`);
  if (customer.comment.trim()) out.push(`Комментарий: ${customer.comment.trim()}`);

  return out.join('\n');
}

export function whatsappUrl(text: string): string {
  const number = WHATSAPP_NUMBER.replace(/\D/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
