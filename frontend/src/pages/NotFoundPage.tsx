import { Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
      <Typography component="h1" sx={{ fontWeight: 700, fontSize: 28, mb: 1 }}>
        Страница не найдена
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 3 }}>
        Возможно, товар закончился или ссылка устарела.
      </Typography>
      <Button variant="contained" component={RouterLink} to="/">
        На главную
      </Button>
    </Container>
  );
}
