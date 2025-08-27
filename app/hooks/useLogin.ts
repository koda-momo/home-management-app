import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { API_URL } from '~/config';
import { loginSchema, type LoginFormData } from '~/schemas/loginValidation';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  /**
   * ログイン.
   */
  const onSubmit = async (data: LoginFormData): Promise<void> => {
    setIsLoading(true);

    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${API_URL}/auth/login`, data);

      if (response.status === 200) {
        navigate('/');
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

  /**
   * ログアウト.
   */
  const logout = async (): Promise<void> => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/logout`);

      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const message =
          error.response.data?.message || 'ログアウトに失敗しました';
        alert(message);
      } else {
        alert('ログアウトに失敗しました');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    formState,
    isLoading,
    onSubmit,
    logout,
  };
};
