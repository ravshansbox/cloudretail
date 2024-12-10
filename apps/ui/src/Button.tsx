import { classed } from '@tw-classed/react';

export const Button = classed.button({
  base: 'bg-emerald-400 px-4 py-2 text-white hover:bg-emerald-600',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
