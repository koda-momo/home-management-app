import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { API_URL } from '~/config';
import { enableAuth } from '~/utils/const';

interface AuthResponse {
  authenticated: boolean;
}

interface UseAuthReturn {
  isAuthenticated: boolean | null;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * 認証状態を確認.
   */
  const checkAuth = async (): Promise<void> => {
    try {
      if (!enableAuth) return;
      const response = await axios.get<AuthResponse>(`${API_URL}/auth/status`);

      setIsAuthenticated(response.data.authenticated);
    } catch (error) {
      console.error('認証チェックに失敗しました:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    isAuthenticated,
    isLoading,
    checkAuth,
  };
};

/**
 * 認証が必要なページで使用するフック.
 * 未認証の場合、自動的にログインページにリダイレクトします.
 */
export const useRequireAuth = (): UseAuthReturn => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoading && auth.isAuthenticated === false) {
      navigate('/login');
    }
  }, [auth.isAuthenticated, auth.isLoading, navigate]);

  return auth;
};
