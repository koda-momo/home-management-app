import axios from 'axios';
import {
  LINE_USER_ID,
  LINE_CHANNEL_ACCESS_TOKEN,
  TIME_OUT,
  NAME1,
  NAME2,
  RENT_AMOUNT,
  SAVINGS_AMOUNT,
} from './const';

/**
 * LINEメッセージを送信
 */
export const sendLineMessage = async (message: string) => {
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
 * LINE成功時のメッセージ.
 */
export const successLineMessage = (registrationInfo: {
  year: number;
  month: number;
  amount: string;
}) => {
  const toLocaleStringAmount = Number(registrationInfo.amount).toLocaleString();
  const unitPrice = Math.round(Number(registrationInfo.amount) / 2);
  const calcPrice = unitPrice + Number(RENT_AMOUNT) + Number(SAVINGS_AMOUNT);
  const RENT_DIFFERENCE = 20000;

  const successMessage = `家計簿botちゃん(テスト投稿)です。
${registrationInfo.year}年${registrationInfo.month}月のデータが登録されました！

【カード代】
・${toLocaleStringAmount} 円

【支払額】
・${NAME1}：${(calcPrice + RENT_DIFFERENCE).toLocaleString()} 円
・${NAME2}：${calcPrice.toLocaleString()} 円

他のデータの登録はこちらから
https://kakeibo-pi.vercel.app`;

  return successMessage;
};
