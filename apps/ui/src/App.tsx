import { FC } from 'react';
import { classed, makeStrict } from '@tw-classed/react';

const Button = makeStrict(
  classed.button({
    base: 'bg-emerald-400 px-4 py-2 text-white hover:bg-emerald-600',
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-md',
        lg: 'text-lg',
      },
    },
    defaultVariants: {},
  }),
);

export const App: FC = () => {
  return <Button size="md">Hello World</Button>;
};
