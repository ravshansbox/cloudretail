import { FC } from 'react';
import { css } from '../styled-system/css';

export const App: FC = () => {
  return (
    <h1
      className={css({
        color: 'slate.800',
        fontSize: '3xl',
        textAlign: 'center',
      })}
    >
      Hello world
    </h1>
  );
};
