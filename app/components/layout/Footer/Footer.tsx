import type { FC } from 'react';
import { Link } from 'react-router';
import { path } from '~/utils/const';
import * as styles from './Footer.css';

/**
 * Footer.
 */
export const Footer: FC = () => {
  return (
    <div className={styles.background}>
      {path.map(({ label, link }) => (
        <div key={label}>
          <Link to={link} className={styles.link}>
            {label}
          </Link>
        </div>
      ))}
    </div>
  );
};
