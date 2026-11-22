import { Box, Container, Typography } from '@mui/material';
import { IS_WHOLESALE } from '../config/mode';

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 6, py: 3, bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          © {YEAR} Mix Shop · {IS_WHOLESALE ? 'Оптовые продажи' : 'Розничные продажи'}
        </Typography>
      </Container>
    </Box>
  );
}
