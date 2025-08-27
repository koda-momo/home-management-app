export const TIME_OUT = 60000;

// スクレイピング
export const SCRAPING_CARD_URL = process.env.SCRAPING_CARD_URL || '';
export const SCRAPING_CARD_DETAIL_URL =
  process.env.SCRAPING_CARD_DETAIL_URL || '';
export const SCRAPING_CARD_KEYWORD = process.env.SCRAPING_CARD_KEYWORD || '';
export const SCRAPING_CARD_ID = process.env.SCRAPING_CARD_ID || '';
export const SCRAPING_CARD_PASSWORD = process.env.SCRAPING_CARD_PASSWORD || '';
export const SCRAPING_CARD_QA_URL = process.env.SCRAPING_CARD_QA_URL || '';

// Firebase設定
export const FIREBASE_CONFIG = {
  apiKey: process.env.FIREBASE_API_KEY || '',
  databaseUrl: process.env.FIREBASE_DATABASE_URL || '',
};

// LINE設定
export const LINE_CHANNEL_ACCESS_TOKEN =
  process.env.LINE_CHANNEL_ACCESS_TOKEN || '';
export const LINE_USER_ID = process.env.LINE_USER_ID || '';
