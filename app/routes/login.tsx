import { Page } from '../pages/login';
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
      <Page />
    </main>
  );
}
