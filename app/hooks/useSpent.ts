import type { SpentFormData } from '~/schemas/spentValidation';

/**
 * 家計簿 支払額関連hook.
 */
export const useSpent = () => {
  /**
   * DBに入力値を登録.
   * TODO:処理作成
   */
  const submitSpentData = (data: SpentFormData) => {
    console.log('入力データ:', data);
    alert('登録しました');
  };

  return { submitSpentData };
};
