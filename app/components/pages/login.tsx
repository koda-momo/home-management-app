import type { FC } from 'react';
import { H1, Input } from '~/components/common';

/**
 * ログインページ.
 */
export const LoginPage: FC = () => {
  return (
    <>
      <H1>ログインページ</H1>
      <Input label="メールアドレス" />
      <Input label="パスワード" />
    </>
  );
};
