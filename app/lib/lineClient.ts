import axios from 'axios';
import type { LinePushMessagePayload, LineApiResponse } from '~/types/line';
import { LINE_API_BASE_URL } from '~/utils/const';

export const sendPushMessage = async (
  channelAccessToken: string,
  userID: string,
  message: string,
  notificationDisabled = false
): Promise<LineApiResponse> => {
  const payload: LinePushMessagePayload = {
    to: userID,
    messages: [
      {
        type: 'text',
        text: message,
      },
    ],
    notificationDisabled,
  };

  try {
    const response = await axios.post(
      `${LINE_API_BASE_URL}/message/push`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${channelAccessToken}`,
        },
        timeout: 5000,
      }
    );

    return {
      status: response.status,
      message: 'Message sent successfully',
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: 500,
        message: error.message,
      };
    }
    return {
      status: 500,
      message: 'Unknown error occurred',
    };
  }
};
