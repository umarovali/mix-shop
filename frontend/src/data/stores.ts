import type { Store } from '../types';

export const STORES: Store[] = [
  {
    id: 'plus',
    name: 'Mix Shop Plus',
    tagline: 'Магазин для дома',
    description: 'Посуда, хозяйственные товары и всё для уюта',
    logo: '/logos/mix-shop-plus.svg',
    icon: '/logos/mix-shop-plus.svg',
    colors: {
      primary: '#E8141B',
      secondary: '#2B2B2B',
      soft: '#FFF0F0',
      gradient: 'linear-gradient(135deg, #FF4A4F 0%, #E8141B 55%, #C20E14 100%)',
      // графит, как круг на логотипе
      hero: 'linear-gradient(135deg, #3A3A42 0%, #232327 55%, #141416 100%)',
    },
  },
  {
    id: 'sport',
    name: 'Mix Shop Sport',
    tagline: 'Спортивный магазин',
    description: 'Гантели, гири, фитнес-инвентарь и аксессуары',
    logo: '/logos/mix-shop-sport.svg',
    icon: '/logos/mix-shop-sport-icon.svg',
    colors: {
      primary: '#E8141B',
      secondary: '#2B2B2B',
      soft: '#FFF0F0',
      gradient: 'linear-gradient(135deg, #FF4A4F 0%, #E8141B 55%, #C20E14 100%)',
      hero: 'linear-gradient(135deg, #FF5A3C 0%, #E8141B 50%, #A80C12 100%)',
    },
  },
  {
    id: 'med',
    name: 'Mix Shop Med',
    tagline: 'Медицинские товары',
    description: 'Корсеты, тонометры, трости, коляски и товары для малышей',
    logo: '/logos/mix-shop-med.svg',
    icon: '/logos/mix-shop-med-icon.svg',
    // основной бирюзовый чуть темнее логотипа — чтобы белый текст на кнопках читался
    colors: {
      primary: '#177E8A',
      secondary: '#36474F',
      soft: '#E8F6F7',
      gradient: 'linear-gradient(135deg, #1FA9B7 0%, #177E8A 60%, #126A75 100%)',
      hero: 'linear-gradient(135deg, #2BC0CC 0%, #178A96 50%, #0E5A64 100%)',
    },
  },
];

export function getStore(id: string | undefined): Store | undefined {
  return STORES.find((s) => s.id === id);
}
