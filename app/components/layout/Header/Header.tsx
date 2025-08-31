import { useState, useEffect, useRef, type FC } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

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
            <button
              className={styles.spLinkButton}
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            >
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
