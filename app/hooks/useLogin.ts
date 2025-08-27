import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { API_URL } from '~/config';

interface LoginData {
  email: string;
  password: string;
}

interface UseLoginReturn {
  email: string;
  password: string;
  isLoading: boolean;
  emailError: string;
  passwordError: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleLogin: () => Promise<void>;
}

export const useLogin = (): UseLoginReturn => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('メールアドレスを入力してください');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('有効なメールアドレスを入力してください');
      isValid = false;
    }

    if (!password) {
      setPasswordError('パスワードを入力してください');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const loginData: LoginData = { email, password };
      const response = await axios.post(`${API_URL}/login`, loginData);

      if (response.status === 200) {
        navigate('/stock');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const message =
          error.response.data?.message || 'ログインに失敗しました';
        alert(message);
      } else {
        alert('ログインに失敗しました');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    password,
    isLoading,
    emailError,
    passwordError,
    setEmail,
    setPassword,
    handleLogin,
  };
};
