import { RENT_AMOUNT, SAVINGS_AMOUNT } from '~/config';
import type { DashboardSpentData } from '~/types/api';

/**
 * 19日以前 or データ登録後はtrueを返す.
 */
export const shouldShowData = (data: DashboardSpentData | null) => {
  if (!data) return false;
  if (!isAfter20th) return true;
  return data.electricity > 0;
};

/**
 * 金額計算.
 */
export const calculatePersonAmount = (
  baseAmount: number,
  isFirstPerson = false
) => {
  const RENT_DIFFERENCE = 20000;
  const additionalAmount = isFirstPerson ? RENT_DIFFERENCE : 0;
  return baseAmount / 2 + RENT_AMOUNT + additionalAmount + SAVINGS_AMOUNT;
};

// 現在の日付取得
const getCurrentDate = () => new Date().getDate();

// 20日以降か判定
export const isAfter20th = getCurrentDate() >= 20;
