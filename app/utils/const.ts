export const title = ' | 家庭管理アプリ';
export const purchaseUrl = 'https://www.amazon.co.jp/';

export const errorMessages = {
  amountRequired: '金額は数字で入力してください',
} as const;

export const pageInfo = {
  home: [
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
};
