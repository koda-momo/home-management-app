import type { FC, ReactNode } from 'react';
import { useLocation } from 'react-router';
import { AuthGuard } from '~/components/auth/AuthGuard';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import * as styles from './PageLayout.css';

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
      <main className={styles.main}>
        <Header isLogin />
        <div className={styles.pageLayout}>{children}</div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <Header />
      <AuthGuard fallback={<div>認証状態を確認中...</div>}>
        <div className={styles.pageLayout}>{children}</div>
      </AuthGuard>
      <Footer />
    </main>
  );
};
