import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { StockTable } from '~/components';
import type { StockItem, StockResponse } from '~/types/stock';

/**
 * 在庫管理ページ.
 */
export const Page: FC = () => {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // TODO:API接続時にaxiosに変更
        // eslint-disable-next-line no-undef
        const response = await fetch('/mocks/item.json');
        const data: StockResponse = await response.json();
        setStockItems(data.data);
      } catch (error) {
        // eslint-disable-next-line no-undef
        console.error('在庫データの取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  return (
    <div>
      <h1>在庫管理</h1>
      <StockTable items={stockItems} />
    </div>
  );
};
