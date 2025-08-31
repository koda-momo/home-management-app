import { style, styleVariants } from '@vanilla-extract/css';
import { themeColor } from '~/styles/const';

export const tag = style({
  width: 35,
  borderRadius: 5,
  padding: `5px 10px`,
  fontWeight: 'bold',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 12,
});

export const category = styleVariants({
  new: {
    background: themeColor.primary,
    color: themeColor.subText,
  },
  update: {
    background: themeColor.secondary,
    color: themeColor.subText,
  },
  fix: {
    background: themeColor.tertiary,
    color: themeColor.text,
  },
});
