import { HouseholdAccountBookPage } from '~/components';
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
      <HouseholdAccountBookPage />
    </main>
  );
}
