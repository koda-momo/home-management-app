import type { FC, InputHTMLAttributes } from 'react';
import * as styles from './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={props.id}>{label}</label>
      <div>
        <input {...props} className={styles.input} />
      </div>
      {error ? (
        <div className={styles.errorMessage}>{error}</div>
      ) : (
        <div className={styles.errorMessage} />
      )}
    </div>
  );
};
