import type { FC } from 'react';
import { Link } from 'react-router';
import { path } from '~/utils/const';
import * as styles from './Header.css';
import { useHeader } from '~/hooks/useHeader';

interface HeaderProps {
  isLogin?: boolean;
}

/**
 * Header.
 */
export const Header: FC<HeaderProps> = ({ isLogin = false }) => {
  const { menuOpen, menuRef, menuOpenOnClick } = useHeader();

  return (
    <div className={styles.background}>
      <div className={styles.logo}>家庭管理システム</div>

      {/* PC */}
      {!isLogin && (
        <>
          <div className={styles.pcLinkList}>
            {path.map(({ label, link }) => (
              <Link key={label} to={link} className={styles.link}>
                {label}
              </Link>
            ))}
          </div>

          {/* SP */}
          <div ref={menuRef}>
            <button className={styles.spLinkButton} onClick={menuOpenOnClick}>
              {menuOpen ? '×' : '≡'}
            </button>
            {menuOpen && (
              <div className={styles.spLinkList}>
                {path.map(({ label, link }) => (
                  <Link key={label} to={link} className={styles.spLink}>
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
