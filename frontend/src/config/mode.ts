import type { SaleMode } from '../types';

const STORAGE_KEY = 'mixshop-sale-mode';

/**
 * Режим продаж определяется адресом сайта:
 *   opt.домен  → опт
 *   домен      → розница
 * Для разработки и показа заказчику: ?opt=1 включает опт, ?opt=0 — розницу
 * (запоминается до закрытия вкладки).
 */
function detectSaleMode(): SaleMode {
  if (window.location.hostname.startsWith('opt.')) return 'wholesale';

  const param = new URLSearchParams(window.location.search).get('opt');
  const fromParam: SaleMode | null =
    param === '1' ? 'wholesale' : param === '0' ? 'retail' : null;

  try {
    if (fromParam) sessionStorage.setItem(STORAGE_KEY, fromParam);
    return sessionStorage.getItem(STORAGE_KEY) === 'wholesale' ? 'wholesale' : 'retail';
  } catch {
    return fromParam ?? 'retail';
  }
}

export const SALE_MODE: SaleMode = detectSaleMode();
export const IS_WHOLESALE = SALE_MODE === 'wholesale';
