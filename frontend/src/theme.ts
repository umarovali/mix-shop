import { alpha, createTheme } from '@mui/material/styles';
import type { BrandColors } from './types';

/** Общие цвета сайта (главная, корзина) — фирменные красный и графит. */
export const DEFAULT_COLORS: BrandColors = {
  primary: '#E8141B',
  secondary: '#2B2B2B',
  soft: '#FFF0F0',
  gradient: 'linear-gradient(135deg, #FF4A4F 0%, #E8141B 55%, #C20E14 100%)',
  hero: 'linear-gradient(135deg, #2E2E35 0%, #1C1C20 60%, #121214 100%)',
};

/** Мягкая тень для карточек вместо серых рамок. */
export const CARD_SHADOW = '0 1px 2px rgba(20,20,43,.04), 0 4px 16px rgba(20,20,43,.06)';
export const CARD_SHADOW_HOVER = '0 2px 4px rgba(20,20,43,.05), 0 14px 32px rgba(20,20,43,.12)';

/** Тема строится от цветов магазина: у каждого магазина свой акцент, остальное общее. */
export function createAppTheme(colors: BrandColors = DEFAULT_COLORS) {
  return createTheme({
    palette: {
      primary: { main: colors.primary },
      secondary: { main: colors.secondary },
      success: { main: '#1E9E57' },
      background: { default: '#F3F4F8', paper: '#FFFFFF' },
      text: { primary: '#16161D', secondary: '#676773' },
      divider: '#E7E7EE',
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
        variants: [
          {
            // яркая градиентная кнопка с цветной тенью
            props: { variant: 'contained', color: 'primary' },
            style: {
              backgroundImage: colors.gradient,
              boxShadow: `0 6px 16px ${alpha(colors.primary, 0.32)}`,
              transition: 'box-shadow .2s, transform .15s, filter .2s',
              '&:hover': { filter: 'brightness(1.06)', boxShadow: `0 8px 22px ${alpha(colors.primary, 0.4)}` },
              '&:active': { transform: 'scale(.98)' },
              '&.Mui-disabled': { backgroundImage: 'none', boxShadow: 'none' },
            },
          },
        ],
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: { root: { boxShadow: CARD_SHADOW } },
      },
      MuiChip: { styleOverrides: { root: { fontWeight: 500 } } },
      MuiTextField: { defaultProps: { fullWidth: true } },
      MuiOutlinedInput: {
        styleOverrides: { root: { borderRadius: 12, backgroundColor: '#FFFFFF' } },
      },
    },
  });
}
