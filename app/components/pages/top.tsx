import type { FC } from 'react';
import { Button, H1 } from '../common';
import { useNavigate } from 'react-router';

/**
 * TOPページ.
 */
export const TopPage: FC = () => {
  const navigate = useNavigate();
  const path = [
    {
      label: '在庫管理',
      link: '/stock',
    },
    {
      label: '家計簿',
      link: '/household-account-book',
    },
  ] as const;

  return (
    <>
      <H1>ダッシュボード</H1>
      <Button>ログアウト</Button>

      {path.map(({ label, link }) => (
        <Button
          key={label}
          onClick={() => {
            navigate(link);
          }}
        >
          在庫管理
        </Button>
      ))}
    </>
  );
};
