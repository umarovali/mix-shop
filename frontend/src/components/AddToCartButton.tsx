import { Button } from '@mui/material';
import AddShoppingCartRounded from '@mui/icons-material/AddShoppingCartRounded';
import QuantityControl from './QuantityControl';
import { useCartQty, useCartStore } from '../store/cart';
import { getMinQty } from '../utils/format';
import type { Product } from '../types';

interface Props {
  product: Product;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

/** «В корзину» → после добавления превращается в счётчик количества. */
export default function AddToCartButton({ product, size = 'medium', fullWidth }: Props) {
  const qty = useCartQty(product.id);
  const add = useCartStore((s) => s.add);
  const setQty = useCartStore((s) => s.setQty);
  const min = getMinQty(product);

  if (!product.inStock) {
    return (
      <Button variant="outlined" disabled size={size} fullWidth={fullWidth}>
        Нет в наличии
      </Button>
    );
  }

  if (qty > 0) {
    return (
      <QuantityControl
        value={qty}
        min={min}
        onChange={(v) => setQty(product.id, v)}
        size={size}
        fullWidth={fullWidth}
      />
    );
  }

  return (
    <Button
      variant="contained"
      size={size}
      fullWidth={fullWidth}
      startIcon={<AddShoppingCartRounded />}
      onClick={() => add(product.id, min)}
    >
      В корзину
    </Button>
  );
}
