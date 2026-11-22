import { createTheme } from '@mui/material/styles';
import type { BrandColors } from './types';

/** Общие цвета сайта (главная, корзина) — фирменные красный и графит. */
export const DEFAULT_COLORS: BrandColors = {
  primary: '#E8141B',
  secondary: '#2B2B2B',
  soft: '#FDECEC',
};

/** Тема строится от цветов магазина: у каждого магазина свой акцент, остальное общее. */
export function createAppTheme(colors: BrandColors = DEFAULT_COLORS) {
  return createTheme({
    palette: {
      primary: { main: colors.primary },
      secondary: { main: colors.secondary },
      success: { main: '#1E9E57' },
      background: { default: '#F5F5F7', paper: '#FFFFFF' },
      text: { primary: '#1A1A1A', secondary: '#6B6B70' },
      divider: '#E6E6EA',
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: '"Montserrat", system-ui, -apple-system, "Segoe UI", Arial, sans-serif',
      button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 12 },
          sizeSmall: { minHeight: 36 },
          sizeMedium: { minHeight: 44 },
          sizeLarge: { minHeight: 52, fontSize: 16 },
        },
      },
      MuiCard: { defaultProps: { variant: 'outlined' } },
      MuiChip: { styleOverrides: { root: { fontWeight: 500 } } },
      MuiTextField: { defaultProps: { fullWidth: true } },
      MuiOutlinedInput: {
        styleOverrides: { root: { borderRadius: 12, backgroundColor: '#FFFFFF' } },
      },
    },
  });
}
