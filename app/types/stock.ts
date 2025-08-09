export interface StockItem {
  id: number;
  name: string;
  count: number;
  url: string;
}

export interface StockResponse {
  status: number;
  data: StockItem[];
}
