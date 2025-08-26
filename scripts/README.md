# Gas Bill Registration Script

GitHub Actionsでガス代を自動登録するスクリプトです。

## 概要

このスクリプトは以下の処理を自動で実行します：

1. `${API_URL}/gas` からガス代データを取得
2. 取得したデータをFirebaseの `price/2025${今月(MM)}` パスに登録
3. 成功時はLINEで「ガス代を登録しました」を送信
4. 失敗時はLINEで「ガス代の登録に失敗しました」を送信

## 必要な環境変数（GitHub Secrets）

以下の環境変数をGitHub SecretsまたはGitHub Actions環境変数として設定してください：

### API設定

- `API_URL`: ガス代取得用APIのベースURL

### Firebase設定

- `FIREBASE_API_KEY`: FirebaseのAPIキー
- `FIREBASE_AUTH_DOMAIN`: FirebaseのAuth Domain
- `FIREBASE_PROJECT_ID`: FirebaseのプロジェクトID
- `FIREBASE_STORAGE_BUCKET`: FirebaseのStorage Bucket
- `FIREBASE_MESSAGING_SENDER_ID`: FirebaseのMessaging Sender ID
- `FIREBASE_APP_ID`: FirebaseのApp ID

### LINE Messaging API設定

- `LINE_CHANNEL_ACCESS_TOKEN`: LINEボットのチャンネルアクセストークン
- `LINE_USER_ID`: 通知を送信するLINEユーザーID

## 実行方法

```bash
node scripts/register-gas-bill.js
```

## GitHub Actions連携

`.github/workflows/gas-bill-registration.yml` で定義されており、`feature/8/gas-bill-registration-github-actions` ブランチにpushされたときに自動実行されます。
