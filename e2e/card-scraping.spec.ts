import { test, expect } from '@playwright/test';

const TIME_OUT = 60000;
const SCRAPING_CARD_URL = process.env.SCRAPING_CARD_URL || '';
const SCRAPING_CARD_DETAIL_URL = process.env.SCRAPING_CARD_DETAIL_URL || '';
const SCRAPING_CARD_KEYWORD = process.env.SCRAPING_CARD_KEYWORD || '';
const SCRAPING_CARD_ID = process.env.SCRAPING_CARD_ID || '';
const SCRAPING_CARD_PASSWORD = process.env.SCRAPING_CARD_PASSWORD || '';
const SCRAPING_CARD_QA_URL = process.env.SCRAPING_CARD_QA_URL || '';

test.describe('カードスクレイピング機能', () => {
  test('カードログインフローのテスト', async ({ page }) => {
    // テストページに移動（実際の実装時は適切なテストURLに変更）
    await page.goto(SCRAPING_CARD_URL);

    // ログインフォームの要素が表示されるまで待機
    await page.waitForSelector('#userId', { timeout: TIME_OUT });

    // ユーザーIDを入力
    await page.fill('#userId', SCRAPING_CARD_ID);
    await page.waitForTimeout(1000);

    // パスワードを入力
    await page.fill('#password', SCRAPING_CARD_PASSWORD);
    await page.waitForTimeout(2000);

    // ログインボタンをクリック
    await page.click('#loginButtonAD');

    console.log('ログインが完了しました');

    // 合言葉入力ページに遷移するまで待機;
    await page.waitForTimeout(2000);
    await page.waitForURL(SCRAPING_CARD_QA_URL, { timeout: TIME_OUT });
    expect(page.url()).toBe(SCRAPING_CARD_QA_URL);

    // 合言葉入力フォームが表示されるまで待機
    await page.waitForSelector('[name="form1:answer_"]', { timeout: TIME_OUT });

    // 合言葉を入力
    await page.fill('[name="form1:answer_"]', SCRAPING_CARD_KEYWORD);

    // // 送信ボタンをクリック
    await page.click('[name="form1:j_idt67"]');

    console.log('合言葉が入力されました');

    // データ取得のテスト
    await page.goto(SCRAPING_CARD_DETAIL_URL);
    await page.waitForSelector('.detail-txt-price', {
      timeout: TIME_OUT,
    });

    const response = await page.$$eval('.detail-txt-price', (options) => {
      return options.map((option) => option.textContent);
    });
    expect(response).not.toBeNull();

    if (response[1]) {
      const data = response[1].replace(/[,\s円]/g, '');
      expect(data).not.toBeNull();
      console.log('処理後のデータ:', data);
    }
  });
});
