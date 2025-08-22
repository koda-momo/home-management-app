import axios from 'axios';
import { useNavigate } from 'react-router';
import type { SpentFormData } from '~/schemas/spentValidation';
import type { PostSpentData, ErrorResponse } from '~/types/api';
import { API_URL } from '~/config';

/**
 * 家計簿 支払額関連hook.
 */
export const useSpent = () => {
  const navigate = useNavigate();

  /**
   * DBに入力値を登録.
   */
  const submitSpentData = async (data: SpentFormData) => {
    try {
      const requestData: PostSpentData = {
        credit: data.credit,
        electricity: data.electricity,
        gas: data.gas,
        water: data.water,
        other: data.other,
      };

      await axios.post(`${API_URL}/spent/month`, requestData);

      alert('登録しました');
      navigate('/home');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data as ErrorResponse;
        alert(errorData.message || 'エラーが発生しました');
      } else {
        alert('予期しないエラーが発生しました');
      }
    }
  };

  return { submitSpentData };
};
