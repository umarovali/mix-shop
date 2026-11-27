import { Badge, Box, ButtonBase, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchRounded from '@mui/icons-material/SearchRounded';
import TuneRounded from '@mui/icons-material/TuneRounded';
import CloseRounded from '@mui/icons-material/CloseRounded';
import { alpha } from '@mui/material/styles';
import { CARD_SHADOW } from '../theme';
import type { Store } from '../types';

interface Props {
  store: Store;
  value: string;
  onChange: (value: string) => void;
  onFilterClick: () => void;
  /** сколько фильтров включено — цифра на кнопке */
  filterCount?: number;
  autoFocus?: boolean;
  /** false — без кнопки фильтров (на компьютере фильтры в боковой колонке) */
  showFilter?: boolean;
}

/** Поиск + кнопка фильтров одним блоком: общая тень и скругление, без зазора. */
export default function SearchBar({
  store,
  value,
  onChange,
  onFilterClick,
  filterCount = 0,
  autoFocus,
  showFilter = true,
}: Props) {
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        display: 'flex',
        height: 46,
        borderRadius: 1,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        boxShadow: CARD_SHADOW,
        transition: 'box-shadow .2s',
        // наведение — тень чуть сильнее, фокус — тонкая обводка цветом магазина вокруг всего блока
        '&:hover': { boxShadow: `${CARD_SHADOW}, 0 0 0 1px ${alpha(store.colors.primary, 0.25)}` },
        '&:focus-within': { boxShadow: `${CARD_SHADOW}, 0 0 0 2px ${alpha(store.colors.primary, 0.6)}` },
      }}
    >
      <TextField
        size="small"
        placeholder="Поиск по названию или артикулу"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        // курсор в конец текста, когда поле получает фокус при переходе на страницу поиска
        onFocus={(e) => {
          const el = e.target as HTMLInputElement;
          el.setSelectionRange(el.value.length, el.value.length);
        }}
        sx={{
          flex: 1,
          '& .MuiOutlinedInput-root': { height: 46, borderRadius: 0, pr: 0.5 },
          // своя рамка у поля не нужна ни в каком состоянии — подсвечивается весь блок (см. :focus-within выше)
          '& .MuiOutlinedInput-notchedOutline, & .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline, & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
            { border: 'none' },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded />
              </InputAdornment>
            ),
            endAdornment: value ? (
              <InputAdornment position="end">
                <IconButton size="small" aria-label="Очистить поиск" onClick={() => onChange('')}>
                  <CloseRounded fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
          },
          htmlInput: { 'aria-label': 'Поиск товаров', enterKeyHint: 'search' },
        }}
      />
      {showFilter && (
        <ButtonBase
          aria-label={filterCount ? `Фильтры, включено: ${filterCount}` : 'Фильтры'}
          onClick={onFilterClick}
          sx={{
            flexShrink: 0,
            width: 52,
            color: '#FFFFFF',
            backgroundImage: store.colors.gradient,
            transition: 'filter .2s',
            '&:hover': { filter: 'brightness(1.08)' },
            '&:active': { filter: 'brightness(.92)' },
          }}
        >
          <Badge
            badgeContent={filterCount}
            sx={{
              '& .MuiBadge-badge': {
                bgcolor: '#FFFFFF',
                color: store.colors.primary,
                fontWeight: 800,
                fontSize: 11,
                minWidth: 18,
                height: 18,
                top: -2,
                right: -4,
              },
            }}
          >
            <TuneRounded />
          </Badge>
        </ButtonBase>
      )}
    </Box>
  );
}
