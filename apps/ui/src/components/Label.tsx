import { classed } from '@tw-classed/react';
import { FC, JSX, PropsWithChildren } from 'react';

const LabelCore = classed('label', {
  base: 'flex flex-col',
});

export const Label: FC<
  PropsWithChildren<JSX.IntrinsicElements['label'] & { text: string }>
> = ({ children, text }) => {
  return (
    <LabelCore>
      <span>{text}</span>
      {children}
    </LabelCore>
  );
};
