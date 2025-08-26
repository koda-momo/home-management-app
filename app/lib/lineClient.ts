import type { LinePushMessagePayload, LineApiResponse } from '~/types/line';

const LINE_API_BASE_URL = 'https://api.line.me/v2/bot';

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
    const response = await fetch(`${LINE_API_BASE_URL}/message/push`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${channelAccessToken}`,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new Error(
        `LINE API error: ${response.status} ${response.statusText}`
      );
    }

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
