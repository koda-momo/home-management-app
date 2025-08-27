import { test, expect } from '@playwright/test';
import {
  SCRAPING_CARD_URL,
  TIME_OUT,
  SCRAPING_CARD_ID,
  SCRAPING_CARD_PASSWORD,
  SCRAPING_CARD_QA_URL,
  SCRAPING_CARD_KEYWORD,
  SCRAPING_CARD_DETAIL_URL,
  FIREBASE_CONFIG,
  LINE_CHANNEL_ACCESS_TOKEN,
  LINE_USER_ID,
} from './const';
import { registerCardDataToFirebase } from './firebase';
import { sendLineMessage } from './line';

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

      // Firebaseにデータを保存
      if (FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.databaseUrl) {
        try {
          const registrationInfo = await registerCardDataToFirebase(data);
          console.log('Firebase registration successful:', registrationInfo);

          // 成功メッセージをLINEで送信
          if (LINE_CHANNEL_ACCESS_TOKEN && LINE_USER_ID) {
            const successMessage = `家計簿botちゃんです。
${registrationInfo.year}年${registrationInfo.month}月のカード代データが登録されました！

カード代：${Number(registrationInfo.amount).toLocaleString()} 円

他のデータの登録はこちらから
https://kakeibo-pi.vercel.app`;

            await sendLineMessage(successMessage);
            console.log('LINE notification sent successfully');
          }
        } catch (error) {
          console.error('Failed to save data or send notification:', error);

          // 失敗通知をLINEで送信
          if (LINE_CHANNEL_ACCESS_TOKEN && LINE_USER_ID) {
            await sendLineMessage('カード代の登録に失敗しました');
          }
        }
      }
    }
  });
});
