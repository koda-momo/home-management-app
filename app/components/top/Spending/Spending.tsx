import type { FC } from 'react';
import * as styles from './Spending.css';
import type { DashboardSpentData } from '~/types/api';
import { calculatePersonAmount } from '~/utils/top';
import { RENT_AMOUNT, SAVINGS_AMOUNT } from '~/config';
import { RENT_DIFFERENCE } from '~/utils/const';

interface SpendingProps {
  data: DashboardSpentData;
}

/**
 * 支払い情報.
 */
export const Spending: FC<SpendingProps> = ({ data }) => {
  const { spending, month } = data;

  return (
    <div>
      <div className={styles.ul}>
        <p>
          {month.slice(0, 4)}年{month.slice(4, 6)}月分のお支払額
        </p>
        <ul>
          <li>合計金額：{spending.toLocaleString()}円</li>
          <li>
            1人目金額：
            {calculatePersonAmount(spending, true).toLocaleString()}円
          </li>
          <li>
            2人目金額：
            {calculatePersonAmount(spending).toLocaleString()}円
          </li>
        </ul>
      </div>

      <div className={styles.ul}>
        内訳
        <ul>
          <li>単価：{Math.round(spending / 2).toLocaleString()}円</li>
          <li>
            家賃：{RENT_AMOUNT.toLocaleString()} 〜{' '}
            {(RENT_AMOUNT + RENT_DIFFERENCE).toLocaleString()}円
          </li>
          <li>貯金：{SAVINGS_AMOUNT.toLocaleString()}円</li>
        </ul>
      </div>
    </div>
  );
};
