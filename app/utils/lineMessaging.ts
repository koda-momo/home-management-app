// TODO: 使用例 後で削除
import { sendPushMessage } from '~/lib/lineClient';
import type { LineApiResponse } from '~/types/line';

export const sendLineMessage = async (
  message: string
): Promise<LineApiResponse> => {
  const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const userID = process.env.LINE_USER_ID;

  if (!channelAccessToken || !userID) {
    return {
      status: 400,
      message:
        'LINE_CHANNEL_ACCESS_TOKEN and LINE_USER_ID environment variables are required',
    };
  }

  return await sendPushMessage(channelAccessToken, userID, message);
};

export const sendLineNotification = async (
  message: string,
  disableNotification = false
): Promise<LineApiResponse> => {
  const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const userID = process.env.LINE_USER_ID;

  if (!channelAccessToken || !userID) {
    return {
      status: 400,
      message:
        'LINE_CHANNEL_ACCESS_TOKEN and LINE_USER_ID environment variables are required',
    };
  }

  return await sendPushMessage(
    channelAccessToken,
    userID,
    message,
    disableNotification
  );
};
