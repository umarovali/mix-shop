import { Box, IconButton, Typography } from '@mui/material';
import AddRounded from '@mui/icons-material/AddRounded';
import RemoveRounded from '@mui/icons-material/RemoveRounded';
import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded';

interface Props {
  value: number;
  /** при значении = min кнопка «−» удаляет товар (onChange(0)) */
  min?: number;
  onChange: (value: number) => void;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

const HEIGHT = { small: 36, medium: 44, large: 52 } as const;

export default function QuantityControl({ value, min = 1, onChange, size = 'medium', fullWidth }: Props) {
  const atMin = value <= min;
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: HEIGHT[size],
        width: fullWidth ? '100%' : 'auto',
        minWidth: 112,
        border: 1,
        borderColor: 'primary.main',
        borderRadius: '12px',
        px: 0.25,
      }}
    >
      <IconButton
        size="small"
        color="primary"
        aria-label={atMin ? 'Удалить из корзины' : 'Уменьшить'}
        onClick={() => onChange(atMin ? 0 : value - 1)}
      >
        {atMin ? <DeleteOutlineRounded fontSize="small" /> : <RemoveRounded fontSize="small" />}
      </IconButton>
      <Typography sx={{ fontWeight: 600, minWidth: 32, textAlign: 'center' }} aria-live="polite">
        {value}
      </Typography>
      <IconButton size="small" color="primary" aria-label="Увеличить" onClick={() => onChange(value + 1)}>
        <AddRounded fontSize="small" />
      </IconButton>
    </Box>
  );
}
