import { Page } from '../pages/stock';
import { pageInfo } from '~/utils/const';

export function meta() {
  return pageInfo.stock;
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
