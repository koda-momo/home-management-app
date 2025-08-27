import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { API_URL } from '~/config';
import { loginSchema, type LoginFormData } from '~/schemas/loginValidation';

interface UseLoginReturn {
  register: ReturnType<typeof useForm<LoginFormData>>['register'];
  handleSubmit: ReturnType<typeof useForm<LoginFormData>>['handleSubmit'];
  formState: ReturnType<typeof useForm<LoginFormData>>['formState'];
  isLoading: boolean;
  onSubmit: (data: LoginFormData) => Promise<void>;
}

export const useLogin = (): UseLoginReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormData): Promise<void> => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/login`, data);

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
    register,
    handleSubmit,
    formState,
    isLoading,
    onSubmit,
  };
};
