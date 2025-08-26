interface LineMessage {
  type: 'text';
  text: string;
}

interface LinePushMessagePayload {
  to: string;
  messages: LineMessage[];
  notificationDisabled?: boolean;
}

interface LineApiResponse {
  status: number;
  message?: string;
}

export type { LineMessage, LinePushMessagePayload, LineApiResponse };
