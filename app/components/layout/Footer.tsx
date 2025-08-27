import type { FC } from 'react';
import { Link } from 'react-router';
import { path } from '~/utils/const';

/**
 * Footer.
 */
export const Footer: FC = () => {
  return (
    <div>
      {path.map(({ label, link }) => (
        <Link key={label} to={link}>
          {label}
        </Link>
      ))}
    </div>
  );
};
