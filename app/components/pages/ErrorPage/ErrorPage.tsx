import { Link } from 'react-router';
import * as styles from './ErrorPage.css';

interface ErrorPageProps {
  title: string;
  message: string;
  statusCode?: number;
  stack?: string;
  showHomeButton?: boolean;
}

export const ErrorPage = ({
  title,
  message,
  statusCode,
  stack,
  showHomeButton = true,
}: ErrorPageProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {statusCode && <div className={styles.statusCode}>{statusCode}</div>}

        <h1 className={styles.title}>{title}</h1>

        <p className={styles.message}>{message}</p>

        {showHomeButton && (
          <Link to="/" className={styles.homeButton}>
            ホームに戻る
          </Link>
        )}

        {import.meta.env.DEV && stack && (
          <details className={styles.details}>
            <summary className={styles.summary}>技術的な詳細を表示</summary>
            <pre className={styles.stackTrace}>
              <code>{stack}</code>
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};
