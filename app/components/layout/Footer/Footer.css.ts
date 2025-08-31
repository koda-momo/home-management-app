import { style } from '@vanilla-extract/css';
import { themeColor } from '~/styles/const';

export const background = style({
  height: 100,
  backgroundColor: themeColor.secondary,
  padding: '10px 10px',
});

export const link = style({
  color: themeColor.subText,
  textDecoration: 'none',
  ':hover': {
    color: themeColor.text,
  },
});
