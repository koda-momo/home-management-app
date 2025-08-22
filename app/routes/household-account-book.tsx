import { Page } from '../pages/householdAccountBook';
import { pageInfo } from '~/utils/const';

export function meta() {
  return pageInfo.householdAccountBook;
}

/**
 * 家計簿ページ.
 */
export default function householdAccountBook() {
  return (
    <main>
      <Page />
    </main>
  );
}
