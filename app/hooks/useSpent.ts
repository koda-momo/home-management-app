import axios from 'axios';
import { useNavigate } from 'react-router';
import { spentSchema, type SpentFormData } from '~/schemas/spentValidation';
import type { PostSpentData, ErrorResponse } from '~/types/api';
import { API_URL } from '~/config';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

/**
 * 家計簿 支払額関連hook.
 */
export const useSpent = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SpentFormData>({
    resolver: zodResolver(spentSchema),
    mode: 'onChange',
  });

  /**
   * DBに入力値を登録.
   */
  const submitSpentData = async (data: SpentFormData) => {
    try {
      const requestData: PostSpentData = {
        credit: Number(data.credit),
        electricity: Number(data.electricity),
        gas: Number(data.gas),
        water: Number(data.water),
        other: Number(data.other),
      };

      await axios.post(`${API_URL}/spent/month`, requestData);

      alert('登録しました');
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data as ErrorResponse;
        alert(errorData.message || 'エラーが発生しました');
      } else {
        alert('予期しないエラーが発生しました');
      }
    }
  };

  return { register, handleSubmit, errors, isValid, submitSpentData };
};
