import type { FC } from 'react';
import * as styles from './StockTable.css';
import type { StockItem } from '~/types/stock';

interface StockTableProps {
  data: StockItem[];
}

export const StockTable: FC<StockTableProps> = ({ data }) => {
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
          {data.map((item) => (
            <tr key={item.id}>
              <td className={styles.td}>{item.id}</td>
              <td className={styles.td}>{item.name}</td>
              <td className={styles.td}>{item.count}</td>
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
