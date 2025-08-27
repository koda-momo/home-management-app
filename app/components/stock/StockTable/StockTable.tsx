import type { FC } from 'react';
import * as styles from './StockTable.css';
import type { StockItem } from '~/types/stock';
import { Button } from '~/components';
import { useStock } from '~/hooks';
import { stockConstants } from '~/utils/const';

interface StockTableProps {
  data: StockItem[];
}

export const StockTable: FC<StockTableProps> = ({ data }) => {
  const { stockData, addStock, subStock } = useStock(data);

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
                <div className={styles.buttonContainer}>
                  <Button
                    disabled={item.count <= stockConstants.MIN_STOCK_COUNT}
                    onClick={() => subStock(item.id)}
                  >
                    -
                  </Button>
                  <span>{item.count}</span>
                  <Button
                    disabled={item.count >= stockConstants.MAX_STOCK_COUNT}
                    onClick={() => addStock(item.id)}
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
