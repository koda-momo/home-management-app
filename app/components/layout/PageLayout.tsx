import type { FC, ReactNode } from 'react';
import { useLocation } from 'react-router';
import { AuthGuard } from '~/components/auth/AuthGuard';
import { Footer } from './Footer';
import { Header } from './Header';

interface PageLayoutProps {
  children: ReactNode;
}

/**
 * PageLayout.
 */
export const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  // ログインページ以外では認証チェックを実行
  if (isLoginPage) {
    return (
      <main>
        <Header />
        {children}
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />
      <AuthGuard fallback={<div>認証状態を確認中...</div>}>
        {children}
      </AuthGuard>
      <Footer />
    </main>
  );
};
