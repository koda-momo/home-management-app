import type { FC } from 'react';
import { H1, Input, Button } from '~/components/common';
import { useLogin } from '~/hooks';

/**
 * ログインページ.
 */
export const LoginPage: FC = () => {
  const { register, handleSubmit, formState, isLoading, onSubmit } = useLogin();

  return (
    <>
      <H1>ログイン</H1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="メールアドレス"
          type="email"
          {...register('email')}
          error={formState.errors.email?.message}
          disabled={isLoading}
        />
        <Input
          label="パスワード"
          type="password"
          {...register('password')}
          error={formState.errors.password?.message}
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !formState.isValid}>
          {isLoading ? 'ログイン中...' : 'ログイン'}
        </Button>
      </form>
    </>
  );
};
