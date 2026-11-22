import { keyframes } from '@emotion/react';

export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: none; }
`;

export const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

export const zoomIn = keyframes`
  from { opacity: 0; transform: scale(.85); }
  to   { opacity: 1; transform: none; }
`;

/** Медленное «дыхание» декоративных кругов на баннерах. */
export const float = keyframes`
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(-12px, 10px) scale(1.06); }
`;

/** Лёгкий «прыжок» значка корзины при добавлении товара. */
export const pop = keyframes`
  0%   { transform: scale(1); }
  40%  { transform: scale(1.25); }
  100% { transform: scale(1); }
`;

const EASE = 'cubic-bezier(.22, 1, .36, 1)';
const NO_MOTION = '@media (prefers-reduced-motion: reduce)';

/**
 * Анимация появления для sx.
 * fill-mode «backwards»: после окончания анимация не держит transform,
 * поэтому эффекты при наведении (подъём карточки) продолжают работать.
 */
export function enter(delay = 0, name = fadeUp, duration = 0.6) {
  return {
    animation: `${name} ${duration}s ${EASE} ${delay}s backwards`,
    [NO_MOTION]: { animation: 'none' },
  };
}

/** Задержка для элементов списка: волна, но не дольше ~0.5 с даже для длинных списков. */
export function stagger(index: number, base = 0, step = 0.06) {
  return base + Math.min(index, 8) * step;
}

export function floating(duration = 9, delay = 0) {
  return {
    animation: `${float} ${duration}s ease-in-out ${delay}s infinite alternate`,
    [NO_MOTION]: { animation: 'none' },
  };
}

export const popOnce = {
  animation: `${pop} .45s ${EASE}`,
  [NO_MOTION]: { animation: 'none' },
};
