import type { FC } from 'react';
import { H1, StockTable } from '~/components';
import type { StockItem } from '~/types/stock';

interface Props {
  data: StockItem[];
}

/**
 * 在庫管理ページ.
 */
export const StockPage: FC<Props> = ({ data }) => {
  return (
    <>
      <H1>在庫管理</H1>
      <StockTable data={data} />
    </>
  );
};
