import type { Store } from '../types';

export const STORES: Store[] = [
  {
    id: 'plus',
    name: 'Mix Shop Plus',
    tagline: 'Магазин для дома',
    description: 'Посуда, хозяйственные товары и всё для уюта',
    logo: '/logos/mix-shop-plus.svg',
    icon: '/logos/mix-shop-plus.svg',
    colors: { primary: '#E8141B', secondary: '#2B2B2B', soft: '#FDECEC' },
  },
  {
    id: 'sport',
    name: 'Mix Shop Sport',
    tagline: 'Спортивный магазин',
    description: 'Гантели, гири, фитнес-инвентарь и аксессуары',
    logo: '/logos/mix-shop-sport.svg',
    icon: '/logos/mix-shop-sport-icon.svg',
    colors: { primary: '#E8141B', secondary: '#2B2B2B', soft: '#FDECEC' },
  },
  {
    id: 'med',
    name: 'Mix Shop Med',
    tagline: 'Медицинские товары',
    description: 'Корсеты, тонометры, трости, коляски и товары для малышей',
    logo: '/logos/mix-shop-med.svg',
    icon: '/logos/mix-shop-med-icon.svg',
    // основной бирюзовый чуть темнее логотипа — чтобы белый текст на кнопках читался
    colors: { primary: '#177E8A', secondary: '#36474F', soft: '#E6F4F5' },
  },
];

export function getStore(id: string | undefined): Store | undefined {
  return STORES.find((s) => s.id === id);
}
