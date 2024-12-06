import { FC } from 'react';
import { styled } from '../styled-system/jsx';

const Heading = styled('h1', {
  base: {
    color: 'slate.800',
    fontSize: '3xl',
  },
});

export const App: FC = () => {
  return <Heading>Hello world</Heading>;
};
