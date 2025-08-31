import { useState } from 'react';
import toast from 'react-hot-toast';
import type { StockItem } from '~/types/stock';
import apiClient from '~/utils/api';

interface UseStockReturn {
  stockData: StockItem[];
  addStock: (id: number) => Promise<void>;
  subStock: (id: number) => Promise<void>;
}

export const useStock = (initialData: StockItem[]): UseStockReturn => {
  const [stockData, setStockData] = useState<StockItem[]>(initialData);

  const addStock = async (id: number) => {
    try {
      await apiClient.post('/stock/count/add', { id });

      setStockData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, count: item.count + 1 } : item
        )
      );
    } catch (error) {
      console.error('在庫追加エラー:', error);
      toast.error('在庫の追加に失敗しました。');
    }
  };

  const subStock = async (id: number) => {
    try {
      await apiClient.post('/stock/count/sub', { id });

      setStockData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, count: item.count - 1 } : item
        )
      );
    } catch (error) {
      console.error('在庫削除エラー:', error);
      toast.error('在庫の削除に失敗しました。');
    }
  };

  return {
    stockData,
    addStock,
    subStock,
  };
};
