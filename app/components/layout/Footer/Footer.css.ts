import { style } from '@vanilla-extract/css';
import { themeColor } from '~/styles/const';

export const background = style({
  width: '100%',
  backgroundColor: themeColor.secondary,
  padding: '10px 10px',
  position: 'fixed',
  bottom: 0,
});

export const link = style({
  color: themeColor.subText,
  textDecoration: 'none',
  ':hover': {
    color: themeColor.text,
  },
});
