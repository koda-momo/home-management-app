import { RENT_AMOUNT, SAVINGS_AMOUNT } from '~/config';
import { RENT_DIFFERENCE } from './const';

/**
 * 金額計算.
 */
export const calculatePersonAmount = (
  baseAmount: number,
  isFirstPerson = false
) => {
  const additionalAmount = isFirstPerson ? RENT_DIFFERENCE : 0;
  return (
    Math.round(baseAmount / 2) + RENT_AMOUNT + additionalAmount + SAVINGS_AMOUNT
  );
};

// 現在の日付取得
const getCurrentDate = () => new Date().getDate();

// 20日以降か判定
export const isAfter20th = getCurrentDate() >= 20;
