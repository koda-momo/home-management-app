export interface ErrorResponse extends Error {
  statusCode: number;
}

export interface SpentApiData {
  credit: number;
  electricity: number;
  gas: number;
  water: number;
  other: number;
}
