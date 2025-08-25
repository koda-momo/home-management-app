import type { FC } from 'react';

interface H1Props {
  children: string;
}

export const H1: FC<H1Props> = ({ children }) => {
  return <h1>{children}</h1>;
};
