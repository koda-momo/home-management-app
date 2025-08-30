import { style } from '@vanilla-extract/css';
import { themeColor } from '~/styles/const';

export const main = style({
  width: '100%',
  height: '100vh',
  background: themeColor.background,
});

export const pageLayout = style({
  padding: '20px 10px',
});
