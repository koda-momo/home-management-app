import { style } from '@vanilla-extract/css';

export const container = style({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  fontFamily: 'Inter, sans-serif',
  backgroundColor: '#f9fafb',
});

export const card = style({
  textAlign: 'center',
  maxWidth: '600px',
  backgroundColor: 'white',
  padding: '3rem',
  borderRadius: '8px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
});

export const statusCode = style({
  fontSize: '6rem',
  fontWeight: 'bold',
  color: '#dc2626',
  lineHeight: '1',
});

export const title = style({
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#111827',
  margin: '1rem 0',
});

export const message = style({
  fontSize: '1.125rem',
  color: '#6b7280',
  marginBottom: '2rem',
});

export const homeButton = style({
  display: 'inline-block',
  backgroundColor: '#3b82f6',
  color: 'white',
  padding: '0.75rem 1.5rem',
  borderRadius: '6px',
  textDecoration: 'none',
  fontWeight: '500',
  transition: 'background-color 0.2s',

  ':hover': {
    backgroundColor: '#2563eb',
  },
});

export const details = style({
  marginTop: '2rem',
  textAlign: 'left',
  fontSize: '0.875rem',
});

export const summary = style({
  cursor: 'pointer',
  color: '#6b7280',
});

export const stackTrace = style({
  backgroundColor: '#f3f4f6',
  padding: '1rem',
  borderRadius: '4px',
  overflow: 'auto',
  marginTop: '0.5rem',
  color: '#374151',
});
