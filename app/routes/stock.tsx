import { Page } from '../pages/stock';
import { title } from '~/utils/const';

export function meta() {
  return [
    { title: `在庫管理${title}` },
    { name: 'description', content: '在庫管理ページ' },
  ];
}

/**
 * 在庫管理ページ.
 */
export default function Stock() {
  return (
    <main>
      <Page />
    </main>
  );
}
