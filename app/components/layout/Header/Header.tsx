import type { FC } from 'react';
import { Link } from 'react-router';
import { path } from '~/utils/const';
import * as styles from './Header.css';

interface HeaderProps {
  isLogin?: boolean;
}

/**
 * Header.
 */
export const Header: FC<HeaderProps> = ({ isLogin = false }) => {
  return (
    <div className={styles.background}>
      <div className={styles.logo}>家庭管理システム</div>
      {!isLogin && (
        <div className={styles.linkList}>
          {path.map(({ label, link }) => (
            <Link key={label} to={link} className={styles.link}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
