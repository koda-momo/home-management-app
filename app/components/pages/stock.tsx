import type { FC } from 'react';
import { StockTable } from '~/components';
import type { StockItem } from '~/types/stock';

interface Props {
  data: StockItem[];
}

/**
 * 在庫管理ページ.
 */
export const StockPage: FC<Props> = ({ data }) => {
  return (
    <div>
      <h1>在庫管理</h1>
      <StockTable data={data} />
    </div>
  );
};
