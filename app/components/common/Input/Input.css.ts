import { style } from '@vanilla-extract/css';
import { themeColor } from '~/styles/const';

export const inputWrapper = style({
  margin: '10px 0',
});

export const input = style({
  width: '80%',
  height: 30,
});

export const errorMessage = style({
  color: themeColor.primary,
  fontSize: '14px',
  height: 20,
});
