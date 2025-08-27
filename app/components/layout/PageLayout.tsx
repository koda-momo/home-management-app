import type { FC, ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

interface PageLayoutProps {
  children: ReactNode;
}

/**
 * PageLayout.
 */
export const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
};
