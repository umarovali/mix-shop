import { InputAdornment, MenuItem, TextField } from '@mui/material';
import SwapVertRounded from '@mui/icons-material/SwapVertRounded';
import { CARD_SHADOW } from '../theme';
import { SORT_OPTIONS, type SortKey } from '../utils/filters';

/** Выпадающая сортировка рядом с поиском (планшет и компьютер). */
export default function SortSelect({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
  return (
    <TextField
      select
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value as SortKey)}
      fullWidth={false}
      slotProps={{
        htmlInput: { 'aria-label': 'Сортировка' },
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SwapVertRounded sx={{ fontSize: 20 }} />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        flexShrink: 0,
        width: { sm: 210, md: 230 },
        '& .MuiOutlinedInput-root': {
          height: 46,
          fontSize: 14,
          fontWeight: 500,
          boxShadow: CARD_SHADOW,
          transition: 'box-shadow .2s',
          '&:hover': { boxShadow: `${CARD_SHADOW}, 0 0 0 1px rgba(20,20,43,.08)` },
        },
        '& .MuiOutlinedInput-notchedOutline, & .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
      }}
    >
      {SORT_OPTIONS.map((o) => (
        <MenuItem key={o.key} value={o.key}>
          {o.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
