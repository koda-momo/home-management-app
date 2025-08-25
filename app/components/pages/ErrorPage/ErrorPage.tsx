import { useNavigate } from 'react-router';
import * as styles from './ErrorPage.css';
import { Button } from '~/components/common';

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
  const navigate = useNavigate();

  const gotoTop = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {statusCode && <div className={styles.statusCode}>{statusCode}</div>}

        <h1 className={styles.title}>{title}</h1>
        <p className={styles.message}>{message}</p>
        {showHomeButton && <Button onClick={gotoTop}>ホームに戻る</Button>}

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
