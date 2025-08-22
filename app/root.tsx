import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';
import './app.css';
import 'react-toastify/dist/ReactToastify.css';
import type { ReactNode } from 'react';
import { ErrorPage } from '~/components';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    const title =
      error.status === 404 ? 'ページが見つかりません' : 'エラーが発生しました';
    const message =
      error.status === 404
        ? 'お探しのページは存在しないか、移動した可能性があります。'
        : error.statusText ||
          '予期しないエラーが発生しました。しばらく時間をおいて再度お試しください。';

    return (
      <ErrorPage title={title} message={message} statusCode={error.status} />
    );
  }

  if (error && error instanceof Error) {
    return (
      <ErrorPage
        title="システムエラー"
        message="アプリケーションでエラーが発生しました。しばらく時間をおいて再度お試しください。"
        stack={import.meta.env.DEV ? error.stack : undefined}
      />
    );
  }

  return (
    <ErrorPage
      title="不明なエラー"
      message="予期しないエラーが発生しました。ページを再読み込みして再度お試しください。"
    />
  );
}
