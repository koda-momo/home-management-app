import type { FC, ReactNode } from 'react';
import { useRequireAuth } from '~/hooks/useAuth';

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * 認証ガードコンポーネント.
 * 認証が必要なコンテンツを保護し、未認証時はリダイレクトします.
 */
export const AuthGuard: FC<AuthGuardProps> = ({
  children,
  fallback = <div>読み込み中...</div>,
}) => {
  const { isAuthenticated, isLoading } = useRequireAuth();

  if (isLoading) {
    return <>{fallback}</>;
  }

  if (isAuthenticated === false) {
    return null; // useRequireAuthがリダイレクトを処理
  }

  return <>{children}</>;
};
