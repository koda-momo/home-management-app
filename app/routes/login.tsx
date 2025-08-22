import { LoginPage } from '~/components';
import { pageInfo } from '~/utils/const';

export function meta() {
  return pageInfo.login;
}

/**
 * ログインページ.
 */
export default function Login() {
  return (
    <main>
      <LoginPage />
    </main>
  );
}
