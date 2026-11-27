import { Box } from '@mui/material';
import ProductCard from './ProductCard';
import type { Product } from '../types';

interface Props {
  products: Product[];
  /** рядом боковая колонка с фильтрами — на компьютере на одну колонку карточек меньше */
  withSidebar?: boolean;
}

/** Сетка карточек: 2 колонки на телефоне, 3 на планшете, 4 на компьютере (3 — если есть боковая колонка). */
export default function ProductGrid({ products, withSidebar }: Props) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: { xs: 1.5, sm: 2, md: 2.5 },
        // телефон: вторая колонка ниже на 15px — «лесенка» для разнообразия
        '& > :nth-of-type(2n)': { position: 'relative', top: { xs: '15px', sm: 0 } },
        pb: { xs: '15px', sm: 0 },
        gridTemplateColumns: {
          xs: 'repeat(2, minmax(0, 1fr))',
          sm: 'repeat(3, minmax(0, 1fr))',
          md: withSidebar ? 'repeat(3, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))',
          lg: withSidebar ? 'repeat(3, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))',
        },
      }}
    >
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </Box>
  );
}
