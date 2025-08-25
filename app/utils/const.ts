export const title = ' | 家庭管理アプリ';

export const errorMessages = {
  amountRequired: '金額は数字で入力してください',
  amountMaxLength: '金額は10桁以下で入力してください',
  amountPositive: '金額は0以上の数値を入力してください',
} as const;

// リンク一覧
export const path = [
  {
    label: 'トップ',
    link: '/',
  },
  {
    label: '在庫管理',
    link: '/stock',
  },
  {
    label: '家計簿',
    link: '/household-account-book',
  },
] as const;

// メタ情報
export const pageInfo = {
  top: [
    { title: `TOP${title}` },
    { name: 'description', content: 'TOPページ' },
  ],
  login: [
    { title: `ログイン${title}` },
    { name: 'description', content: 'ログインページ' },
  ],
  householdAccountBook: [
    { title: `家計簿${title}` },
    { name: 'description', content: '家計簿ページ' },
  ],
  stock: [
    { title: `在庫管理${title}` },
    { name: 'description', content: '在庫管理ページ' },
  ],
} as const;
