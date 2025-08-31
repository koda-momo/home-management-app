import { style } from '@vanilla-extract/css';
import { themeColor } from '~/styles/const';

export const button = style({
  border: `2px solid ${themeColor.primary}`,
  background: themeColor.primary,
  borderRadius: 5,
  padding: `5px 10px`,
  color: themeColor.subText,
  fontWeight: 'bold',
  cursor: 'pointer',
});

export const disable = style({
  border: `2px solid ${themeColor.tertiary}`,
  background: themeColor.tertiary,
  color: themeColor.text,
  cursor: 'default',
});
