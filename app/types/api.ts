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
