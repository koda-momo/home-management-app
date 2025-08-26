const axios = require('axios');

// 環境変数の取得
const API_URL = process.env.API_URL;
const FIREBASE_CONFIG = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
const LINE_USER_ID = process.env.LINE_USER_ID;

/**
 * LINEメッセージを送信
 */
const sendLineMessage = async (message) => {
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
        timeout: 5000,
      }
    );
  } catch (error) {
    console.error('LINE message sending failed:', error.message);
  }
};

/**
 * ガス代データを取得
 */
const getGasAmount = async () => {
  try {
    const response = await axios.get(`${API_URL}/gas`, {
      timeout: 10000,
    });
    return response.data.amount;
  } catch (error) {
    throw new Error(`Failed to get gas amount: ${error.message}`);
  }
};

/**
 * Firebaseにガス代データを登録
 */
const registerGasBillToFirebase = async (gasAmount) => {
  try {
    const now = new Date();
    const currentMonth = String(now.getMonth() + 1).padStart(2, '0');
    const path = `price/2025${currentMonth}`;

    // Firebase REST APIを使用してデータを登録
    const firebaseUrl = `https://${FIREBASE_CONFIG.projectId}-default-rtdb.firebaseio.com/${path}.json?auth=${FIREBASE_CONFIG.apiKey}`;

    const postData = {
      gas: parseInt(gasAmount, 10),
    };

    await axios.patch(firebaseUrl, postData, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    console.log(`Successfully registered gas bill: ${gasAmount} to ${path}`);
  } catch (error) {
    throw new Error(
      `Failed to register gas bill to Firebase: ${error.message}`
    );
  }
};

/**
 * メイン処理
 */
const main = async () => {
  console.log('Starting gas bill registration process...');

  try {
    // 必須環境変数チェック
    if (!API_URL || !LINE_CHANNEL_ACCESS_TOKEN || !LINE_USER_ID) {
      throw new Error('Required environment variables are missing');
    }

    if (!FIREBASE_CONFIG.apiKey || !FIREBASE_CONFIG.projectId) {
      throw new Error('Required Firebase configuration is missing');
    }

    // ガス代データを取得
    console.log('Fetching gas amount...');
    const gasAmount = await getGasAmount();
    console.log(`Gas amount retrieved: ${gasAmount}`);

    // Firebaseに登録
    console.log('Registering gas bill to Firebase...');
    await registerGasBillToFirebase(gasAmount);

    // 成功メッセージをLINEで送信
    await sendLineMessage('ガス代を登録しました');
    console.log('Gas bill registration completed successfully');
  } catch (error) {
    console.error('Gas bill registration failed:', error.message);

    // 失敗メッセージをLINEで送信
    await sendLineMessage('ガス代の登録に失敗しました');

    // GitHub Actionsで失敗として扱う
    process.exit(1);
  }
};

// スクリプト実行
main();
