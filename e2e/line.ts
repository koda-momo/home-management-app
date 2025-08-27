import axios from 'axios';
import { LINE_USER_ID, LINE_CHANNEL_ACCESS_TOKEN, TIME_OUT } from './const';

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
