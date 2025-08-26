import type { FC } from 'react';
import { Button, H1 } from '../common';
import { useNavigate } from 'react-router';
import { path } from '~/utils/const';

import type { DashboardSpentData } from '~/types/api';
import {
  shouldShowData,
  calculatePersonAmount,
  isAfter20th,
} from '~/utils/top';

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

      {shouldShowData(data) && data ? (
        <div>
          <p>・合計金額：{data.spending.toLocaleString()}円</p>
          <p>
            ・1人目金額：
            {calculatePersonAmount(data.spending, true).toLocaleString()}円
          </p>
          <p>
            ・2人目金額：{calculatePersonAmount(data.spending).toLocaleString()}
            円
          </p>
        </div>
      ) : (
        isAfter20th && (
          <>
            今月のデータが登録されていません
            <Button
              onClick={() => {
                navigate('/household-account-book');
              }}
            >
              データを登録
            </Button>
          </>
        )
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
