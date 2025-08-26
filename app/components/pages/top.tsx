import type { FC } from 'react';
import { Button, H1 } from '../common';
import { useNavigate } from 'react-router';
import { path } from '~/utils/const';
import { RENT_AMOUNT, SAVINGS_AMOUNT } from '~/config';
import type { DashboardSpentData } from '~/types/api';

interface Props {
  data: DashboardSpentData | null;
}

/**
 * TOPページ.
 */
export const TopPage: FC<Props> = ({ data }) => {
  const navigate = useNavigate();

  const getCurrentDate = () => new Date().getDate();
  const isAfter20th = getCurrentDate() >= 20;

  const shouldShowData = () => {
    if (!data) return false;
    if (!isAfter20th) return true; // 19日以前は常に表示
    return data.electricity > 0; // 20日以降は電気代が登録済みの場合のみ表示
  };

  const calculatePersonAmount = (baseAmount: number, isFirstPerson = false) => {
    const additionalAmount = isFirstPerson ? 20000 : 0;
    return baseAmount / 2 + RENT_AMOUNT + additionalAmount + SAVINGS_AMOUNT;
  };

  return (
    <>
      <H1>ダッシュボード</H1>

      {shouldShowData() && data ? (
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
          <Button
            onClick={() => {
              navigate('/household-account-book');
            }}
          >
            今月のデータが登録されていません
          </Button>
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
