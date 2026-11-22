import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import WhatsApp from '@mui/icons-material/WhatsApp';
import CloseRounded from '@mui/icons-material/CloseRounded';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import QuantityControl from '../components/QuantityControl';
import { HEADER_HEIGHT } from '../config/layout';
import { useCartStore } from '../store/cart';
import { getProduct } from '../data/products';
import { STORES } from '../data/stores';
import { IS_WHOLESALE } from '../config/mode';
import {
  PHONE_PREFIX,
  formatPhoneLocal,
  formatPrice,
  getMinQty,
  getPrice,
  isAvailableInMode,
  isPhoneLocalValid,
  plural,
} from '../utils/format';
import { buildOrderMessage, cartTotal, whatsappUrl, type CartLine } from '../utils/whatsapp';

const WHATSAPP_GREEN = '#1FAF54';

export default function CartPage() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const setQty = useCartStore((s) => s.setQty);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sentDialog, setSentDialog] = useState(false);

  const lines: CartLine[] = items.flatMap((i) => {
    const product = getProduct(i.productId);
    return product && isAvailableInMode(product) ? [{ product, qty: i.qty }] : [];
  });

  const nameError = name.trim().length < 2;
  const phoneError = !isPhoneLocalValid(phone);

  const handleOrder = () => {
    setSubmitted(true);
    if (nameError || phoneError) return;
    const text = buildOrderMessage(lines, { name, phone: `${PHONE_PREFIX} ${phone}`, comment });
    window.open(whatsappUrl(text), '_blank', 'noopener');
    setSentDialog(true);
  };

  if (!lines.length) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
        <ShoppingCartOutlined sx={{ fontSize: 64, color: 'text.disabled' }} />
        <Typography component="h1" sx={{ fontWeight: 700, fontSize: 24, mt: 2, mb: 1 }}>
          Корзина пуста
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 3 }}>Добавьте товары из любого магазина</Typography>
        <Button variant="contained" component={RouterLink} to="/">
          К магазинам
        </Button>
      </Container>
    );
  }

  const totalQty = lines.reduce((s, l) => s + l.qty, 0);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2.5, md: 4 } }}>
      <Typography component="h1" sx={{ fontWeight: 700, fontSize: { xs: 24, md: 32 }, mb: 2 }}>
        Корзина
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: { xs: 2.5, md: 4 },
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 380px' },
          alignItems: 'start',
        }}
      >
        {/* Товары по магазинам */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {STORES.map((store) => {
            const storeLines = lines.filter((l) => l.product.storeId === store.id);
            if (!storeLines.length) return null;
            return (
              <Paper key={store.id} variant="outlined" sx={{ borderRadius: '16px', overflow: 'hidden' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1.25, bgcolor: store.colors.soft }}>
                  <Box component="img" src={store.icon} alt="" sx={{ width: 28, height: 28, objectFit: 'contain' }} />
                  <Typography sx={{ fontWeight: 700 }}>{store.name}</Typography>
                </Box>
                {storeLines.map((l, idx) => {
                  const price = getPrice(l.product) ?? 0;
                  return (
                    <Box key={l.product.id}>
                      {idx > 0 && <Divider />}
                      <Box sx={{ display: 'flex', gap: 1.5, p: 2 }}>
                        <Box
                          component={RouterLink}
                          to={`/store/${l.product.storeId}/product/${l.product.id}`}
                          sx={{ width: { xs: 72, sm: 88 }, flexShrink: 0, borderRadius: '12px', overflow: 'hidden' }}
                        >
                          <ProductImage src={l.product.images[0]} alt={l.product.name} />
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                            <Typography
                              component={RouterLink}
                              to={`/store/${l.product.storeId}/product/${l.product.id}`}
                              sx={{
                                flex: 1,
                                fontSize: 14,
                                fontWeight: 500,
                                lineHeight: 1.35,
                                color: 'inherit',
                                textDecoration: 'none',
                              }}
                            >
                              {l.product.name}
                            </Typography>
                            <IconButton
                              size="small"
                              aria-label="Удалить"
                              onClick={() => remove(l.product.id)}
                              sx={{ mt: -0.5, mr: -0.5 }}
                            >
                              <CloseRounded fontSize="small" />
                            </IconButton>
                          </Box>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                            {formatPrice(price)} / шт.
                            {IS_WHOLESALE && ` · от ${getMinQty(l.product)} шт.`}
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: 1,
                              mt: 1,
                              flexWrap: 'wrap',
                            }}
                          >
                            <QuantityControl
                              size="small"
                              value={l.qty}
                              min={getMinQty(l.product)}
                              onChange={(v) => setQty(l.product.id, v)}
                            />
                            <Typography sx={{ fontWeight: 700 }}>{formatPrice(price * l.qty)}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Paper>
            );
          })}
        </Box>

        {/* Итог и оформление */}
        <Paper
          variant="outlined"
          sx={{ p: { xs: 2, md: 3 }, borderRadius: '16px', position: { md: 'sticky' }, top: { md: HEADER_HEIGHT.sm + 24 } }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'text.secondary', fontSize: 14 }}>
            <span>
              {lines.length} {plural(lines.length, ['позиция', 'позиции', 'позиций'])}, {totalQty} шт.
            </span>
            {IS_WHOLESALE && <span>Оптовые цены</span>}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mt: 1, mb: 2.5 }}>
            <Typography sx={{ fontWeight: 600 }}>Итого</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: 24 }}>{formatPrice(cartTotal(lines))}</Typography>
          </Box>

          <Box component="form" noValidate onSubmit={(e) => { e.preventDefault(); handleOrder(); }}
            sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <TextField
              label="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={submitted && nameError}
              helperText={submitted && nameError ? 'Введите имя' : ' '}
              autoComplete="name"
            />
            <TextField
              label="Телефон"
              placeholder="555 52 52 52"
              value={phone}
              onChange={(e) => setPhone(formatPhoneLocal(e.target.value))}
              error={submitted && phoneError}
              helperText={submitted && phoneError ? 'Введите номер: 9 цифр после +996' : ' '}
              type="tel"
              autoComplete="tel-national"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start" sx={{ '& p': { color: 'text.primary', fontWeight: 500 } }}>
                      {PHONE_PREFIX}
                    </InputAdornment>
                  ),
                },
                htmlInput: { inputMode: 'tel' },
              }}
            />
            <TextField
              label="Комментарий (необязательно)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              multiline
              minRows={2}
            />
            <Button
              type="submit"
              size="large"
              variant="contained"
              startIcon={<WhatsApp />}
              sx={{ mt: 1, bgcolor: WHATSAPP_GREEN, '&:hover': { bgcolor: '#17964A' } }}
            >
              Отправить заказ в WhatsApp
            </Button>
            <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
              Откроется WhatsApp с готовым сообщением — останется нажать «Отправить». Менеджер подтвердит заказ.
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Dialog open={sentDialog} onClose={() => setSentDialog(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 700 }}>Заказ готов к отправке</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: 'text.secondary' }}>
            Мы открыли WhatsApp с текстом заказа. Отправьте сообщение, и менеджер свяжется с вами. Очистить корзину?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setSentDialog(false)}>Оставить</Button>
          <Button
            variant="contained"
            onClick={() => {
              clear();
              setSentDialog(false);
              navigate('/');
            }}
          >
            Очистить корзину
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
