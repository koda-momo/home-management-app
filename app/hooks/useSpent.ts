import { toast } from 'react-toastify';

/**
 * 家計簿 支払額関連hook.
 */
export const useSpent = () => {
  /**
   * DBに入力値を登録.
   * TODO:処理作成
   */
  const submitSpentData = () => {
    toast('登録しました');
  };

  return { submitSpentData };
};
