import type { FC } from 'react';
import { Button, H1 } from '../../common';
import type { DashboardSpentData } from '~/types/api';
import { useLogin } from '~/hooks';
import { Info, Spending } from '~/components/top';

interface Props {
  data: DashboardSpentData | null;
}

/**
 * TOPページ.
 */
export const TopPage: FC<Props> = ({ data }) => {
  const { logout } = useLogin();

  return (
    <>
      <H1>ダッシュボード</H1>
      {data && <Spending data={data} />}
      <Info />
      <Button onClick={logout}>ログアウト</Button>
    </>
  );
};
