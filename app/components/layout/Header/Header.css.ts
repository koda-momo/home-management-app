import { style } from '@vanilla-extract/css';
import { themeColor } from '~/styles/const';

export const background = style({
  height: 50,
  backgroundColor: themeColor.secondary,
  padding: '0 10px',
  display: 'flex',
  alignItems: 'center',
});

export const logo = style({
  color: themeColor.subText,
  fontWeight: 'bold',
});

export const linkList = style({
  marginLeft: 'auto',
  display: 'flex',
  gap: 10,
});

export const link = style({
  color: themeColor.subText,
  textDecoration: 'none',
  ':hover': {
    color: themeColor.text,
  },
});
