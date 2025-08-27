import { test, expect } from '@playwright/test';
import axios from 'axios';

const TIME_OUT = 60000;
const SCRAPING_CARD_URL = process.env.SCRAPING_CARD_URL || '';
const SCRAPING_CARD_DETAIL_URL = process.env.SCRAPING_CARD_DETAIL_URL || '';
const SCRAPING_CARD_KEYWORD = process.env.SCRAPING_CARD_KEYWORD || '';
const SCRAPING_CARD_ID = process.env.SCRAPING_CARD_ID || '';
const SCRAPING_CARD_PASSWORD = process.env.SCRAPING_CARD_PASSWORD || '';
const SCRAPING_CARD_QA_URL = process.env.SCRAPING_CARD_QA_URL || '';

// Firebase設定
const FIREBASE_CONFIG = {
  apiKey: process.env.FIREBASE_API_KEY || '',
  databaseUrl: process.env.FIREBASE_DATABASE_URL || '',
};

// LINE設定
const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN || '';
const LINE_USER_ID = process.env.LINE_USER_ID || '';

/**
 * LINEメッセージを送信
 */
const sendLineMessage = async (message: string) => {
  try {
    await axios.post(
      'https://api.line.me/v2/bot/message/push',
      {
        to: LINE_USER_ID,
        messages: [
          {
            type: 'text',
            text: message,
          },
        ],
        notificationDisabled: false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
        },
        timeout: TIME_OUT,
      }
    );
  } catch (error) {
    console.error('LINE message sending failed:', error);
  }
};

/**
 * Firebaseにカードデータを登録
 */
const registerCardDataToFirebase = async (cardAmount: string) => {
  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = String(now.getMonth() + 1).padStart(2, '0');
    const path = `price/${currentYear}${currentMonth}`;

    const firebaseUrl = `${FIREBASE_CONFIG.databaseUrl}/${path}.json?auth=${FIREBASE_CONFIG.apiKey}`;

    const postData = {
      credit: parseInt(cardAmount, 10),
    };

    await axios.patch(firebaseUrl, postData, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: TIME_OUT,
    });

    console.log(`Successfully registered card data: ${cardAmount} to ${path}`);

    return {
      year: currentYear,
      month: parseInt(currentMonth, 10),
      amount: cardAmount,
    };
  } catch (error) {
    throw new Error(`Failed to register card data to Firebase: ${error}`);
  }
};

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

カード代：${registrationInfo.amount} 円

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
