import type { FC } from 'react';
import { Button, H1 } from '../common';
import { useNavigate } from 'react-router';
import { path } from '~/utils/const';

/**
 * TOPページ.
 */
export const TopPage: FC = () => {
  const navigate = useNavigate();

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
          {label}
        </Button>
      ))}
    </>
  );
};
