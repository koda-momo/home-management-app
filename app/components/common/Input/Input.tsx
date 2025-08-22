import type { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div>
      <label htmlFor={props.id}>{label}</label>
      <input {...props} />
      {error && <div style={{ color: 'red', fontSize: '14px' }}>{error}</div>}
    </div>
  );
};
