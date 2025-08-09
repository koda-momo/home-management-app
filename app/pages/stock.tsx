import type { FC } from "react";
import { useEffect, useState } from "react";

interface StockItem {
  id: number;
  name: string;
  count: number;
  url: string;
}

interface StockResponse {
  status: number;
  data: StockItem[];
}

/**
 * 在庫管理ページ.
 */
export const Page: FC = () => {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch("/mocks/item.json");
        const data: StockResponse = await response.json();
        setStockItems(data.data);
      } catch (error) {
        console.error("在庫データの取得に失敗しました:", error);
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
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>商品名</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>商品個数</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>URL</th>
          </tr>
        </thead>
        <tbody>
          {stockItems.map((item) => (
            <tr key={item.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.id}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.count}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <a
                  href={decodeURIComponent(item.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#0066cc", textDecoration: "underline" }}
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
