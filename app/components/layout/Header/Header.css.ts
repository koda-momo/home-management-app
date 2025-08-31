import { style } from '@vanilla-extract/css';
import { themeColor } from '~/styles/const';

export const background = style({
  position: 'relative',
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

export const pcLinkList = style({
  '@media': {
    'screen and (max-width: 768px)': {
      display: 'none',
    },
  },
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

export const spLinkButton = style({
  '@media': {
    'screen and (min-width: 768px)': {
      display: 'none',
    },
  },
  position: 'absolute',
  top: 10,
  right: 0,
  zIndex: 10,
  fontSize: 30,
  color: themeColor.subText,
  border: 'none',
  background: themeColor.secondary,
});

export const spLinkList = style({
  background: themeColor.secondary,
  width: 200,
  height: 'calc(100vh - 50px)',
  position: 'absolute',
  top: 50,
  right: 0,
  padding: 10,
});

export const spLink = style({
  display: 'block',
  padding: '10px 0',
  color: themeColor.subText,
  textDecoration: 'none',
});
