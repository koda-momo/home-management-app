import type { FC } from 'react';
import { useState } from 'react';
import axios from 'axios';
import * as styles from './StockTable.css';
import type { StockItem } from '~/types/stock';
import { Button } from '~/components';
import { API_URL } from '~/config';

interface StockTableProps {
  data: StockItem[];
}

export const StockTable: FC<StockTableProps> = ({ data }) => {
  const [stockData, setStockData] = useState<StockItem[]>(data);

  const handleCountChange = async (id: number, action: 'add' | 'sub') => {
    try {
      const endpoint = action === 'add' ? '/stock/add' : '/stock/sub';
      await axios.post(`${API_URL}${endpoint}`, { id });

      setStockData((prevData) =>
        prevData.map((item) =>
          item.id === id
            ? {
                ...item,
                count: action === 'add' ? item.count + 1 : item.count - 1,
              }
            : item
        )
      );
    } catch (error) {
      console.error('在庫更新エラー:', error);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>ID</th>
            <th className={styles.th}>商品名</th>
            <th className={styles.th}>商品個数</th>
            <th className={styles.th}>URL</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((item) => (
            <tr key={item.id}>
              <td className={styles.td}>{item.id}</td>
              <td className={styles.td}>{item.name}</td>
              <td className={styles.td}>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Button
                    disabled={item.count <= 0}
                    onClick={() => handleCountChange(item.id, 'sub')}
                  >
                    -
                  </Button>
                  <span>{item.count}</span>
                  <Button
                    disabled={item.count >= 20}
                    onClick={() => handleCountChange(item.id, 'add')}
                  >
                    +
                  </Button>
                </div>
              </td>
              <td className={styles.td}>
                <a
                  href={decodeURIComponent(item.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  商品ページを開く
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
