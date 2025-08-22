import type { FC, InputHTMLAttributes } from 'react';
import * as styles from './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div>
      <label htmlFor={props.id}>{label}</label>
      <input {...props} />
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};
