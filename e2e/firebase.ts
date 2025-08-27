import axios from 'axios';
import { FIREBASE_CONFIG, TIME_OUT } from './const';

/**
 * Firebaseにカードデータを登録
 */
export const registerCardDataToFirebase = async (cardAmount: string) => {
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
