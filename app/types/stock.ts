import type { ErrorResponse } from './api';

export interface StockItem {
  id: number;
  name: string;
  count: number;
  url: string;
}

export type StockResponse = StockItem | ErrorResponse;
