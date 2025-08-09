import type { FC } from 'react';
import * as styles from './StockTable.css';

interface StockItem {
  id: number;
  name: string;
  count: number;
  url: string;
}

interface StockTableProps {
  items: StockItem[];
}

export const StockTable: FC<StockTableProps> = ({ items }) => {
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
          {items.map((item) => (
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
