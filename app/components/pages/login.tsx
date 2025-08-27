import type { FC, FormEvent } from 'react';
import { H1, Input, Button } from '~/components/common';
import { useLogin } from '~/hooks';

/**
 * ログインページ.
 */
export const LoginPage: FC = () => {
  const {
    email,
    password,
    isLoading,
    emailError,
    passwordError,
    setEmail,
    setPassword,
    handleLogin,
  } = useLogin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <>
      <H1>ログイン</H1>
      <form onSubmit={handleSubmit}>
        <Input
          label="メールアドレス"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          disabled={isLoading}
        />
        <Input
          label="パスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'ログイン中...' : 'ログイン'}
        </Button>
      </form>
    </>
  );
};
