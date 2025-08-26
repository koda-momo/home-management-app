export interface ErrorResponse extends Error {
  statusCode: number;
}

export interface PostSpentData {
  credit: number;
  electricity: number;
  gas: number;
  water: number;
  other: number;
}

export interface MonthlySpentData {
  credit?: number;
  electricity?: number;
  gas?: number;
  water?: number;
  other?: number;
}

export interface DashboardSpentData {
  credit: number;
  electricity: number;
  gas: number;
  water: number;
  other: number;
  spending: number;
}
