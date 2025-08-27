export interface ErrorResponse extends Error {
  statusCode: number;
}

export interface PostSpentData {
  credit: number;
  other: number;
}

export interface MonthlySpentData {
  credit?: number;
  other?: number;
}

export interface DashboardSpentData {
  month: string;
  credit: number;
  other: number;
  spending: number;
}
