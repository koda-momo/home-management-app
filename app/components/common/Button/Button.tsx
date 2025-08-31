import type { FC, ButtonHTMLAttributes } from 'react';
import * as styles from './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`${styles.button} ${props.disabled && styles.disable}`}
    >
      {children}
    </button>
  );
};
