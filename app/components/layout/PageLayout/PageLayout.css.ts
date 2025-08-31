import { style } from '@vanilla-extract/css';
import { themeColor } from '~/styles/const';

export const main = style({
  width: '100%',
  minHeight: '100vh',
});

export const loginPageLayout = style({
  minHeight: 'calc(100vh - 50px)', // Header,
  background: themeColor.background,
  padding: '20px 10px',
});

export const pageLayout = style({
  minHeight: 'calc(100vh - 150px)', // Header, Footer
  background: themeColor.background,
  padding: '20px 10px',
});
