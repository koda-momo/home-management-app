import { style } from '@vanilla-extract/css';
import { themeColor } from '~/styles/const';

export const wrapper = style({ margin: `20px 0` });

export const infoTitle = style({ fontWeight: 'bold' });

export const ul = style({
  padding: 10,
  border: `2px solid ${themeColor.secondary}`,
  borderRadius: 10,
  height: 200,
  overflowY: 'scroll',
});

export const list = style({
  listStyle: 'none',
  padding: `8px 0`,
});

export const title = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
});
