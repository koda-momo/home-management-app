import { useState } from 'react';
import axios from 'axios';
import type { StockItem } from '~/types/stock';
import { API_URL } from '~/config';

interface UseStockReturn {
  stockData: StockItem[];
  addStock: (id: number) => Promise<void>;
  subStock: (id: number) => Promise<void>;
}

export const useStock = (initialData: StockItem[]): UseStockReturn => {
  const [stockData, setStockData] = useState<StockItem[]>(initialData);

  const addStock = async (id: number) => {
    try {
      await axios.post(`${API_URL}/stock/add`, { id });

      setStockData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, count: item.count + 1 } : item
        )
      );
    } catch (error) {
      console.error('在庫追加エラー:', error);
    }
  };

  const subStock = async (id: number) => {
    try {
      await axios.post(`${API_URL}/stock/sub`, { id });

      setStockData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, count: item.count - 1 } : item
        )
      );
    } catch (error) {
      console.error('在庫削除エラー:', error);
    }
  };

  return {
    stockData,
    addStock,
    subStock,
  };
};
