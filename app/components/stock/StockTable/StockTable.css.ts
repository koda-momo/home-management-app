import { style } from '@vanilla-extract/css';

export const tableContainer = style({
  width: '100%',
  marginTop: '20px',
});

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
});

export const thead = style({
  backgroundColor: '#f5f5f5',
});

export const th = style({
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'center',
});

export const td = style({
  border: '1px solid #ddd',
  padding: '8px',
});

export const link = style({
  color: '#0066cc',
  textDecoration: 'underline',
});

export const buttonContainer = style({
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const cartIcon = style({
  width: '100%',
  height: 20,
  display: 'flex',
  alignItems: 'center',
});
