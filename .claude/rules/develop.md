## 開発ルール

- CSS は vanilla-extract を利用
- テストは vitest を利用
- APIはlocalhost:3000からSSRで取得

## フォルダ構成

- `app/routes/` 配下にページを作成(home, shop-detail)
- `app/components/` 配下にコンポーネントを作成
- `app/components/{component名}/{component名}.tsx` の形式でコンポーネントを作成
- `app/components/{component名}/{component名}.css.ts` の形式でコンポーネントに紐づく CSS を作成
- `app/components/{component名}/{component名}.test.ts` の形式でコンポーネントに紐づく test を作成

## 命名

- style に関するもの：パスカルケース
- 定数：アッパースネークケース
- コンポーネント名、コンポーネントファイル：パスカルケース
- その他のファイル：キャメルケース
- その他の名前：キャメルケース
