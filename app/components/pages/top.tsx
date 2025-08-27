import type { FC } from 'react';
import { Button, H1 } from '../common';
import { useNavigate } from 'react-router';
import { path, RENT_DIFFERENCE } from '~/utils/const';

import type { DashboardSpentData } from '~/types/api';
import { calculatePersonAmount } from '~/utils/top';
import { RENT_AMOUNT, SAVINGS_AMOUNT } from '~/config';

interface Props {
  data: DashboardSpentData | null;
}

/**
 * TOPページ.
 */
export const TopPage: FC<Props> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <>
      <H1>ダッシュボード</H1>

      {data && (
        <div>
          <p>
            {data.month.slice(0, 4)}年{data.month.slice(4, 6)}月分のお支払額
          </p>
          <p>・合計金額：{data.spending.toLocaleString()}円</p>
          <p>
            ・1人目金額：
            {calculatePersonAmount(data.spending, true).toLocaleString()}円
          </p>
          <p>
            ・2人目金額：{calculatePersonAmount(data.spending).toLocaleString()}
            円
          </p>

          <div>
            内訳
            <ul>
              <li>単価：{(data.spending / 2).toLocaleString()}円</li>
              <li>
                家賃：{RENT_AMOUNT.toLocaleString()} 〜
                {(RENT_AMOUNT + RENT_DIFFERENCE).toLocaleString()}円
              </li>
              <li>貯金：{SAVINGS_AMOUNT.toLocaleString()}円</li>
            </ul>
          </div>
        </div>
      )}

      <Button>ログアウト</Button>
      {path.map(({ label, link }) => (
        <Button
          key={label}
          onClick={() => {
            navigate(link);
          }}
        >
          {label}
        </Button>
      ))}
    </>
  );
};
