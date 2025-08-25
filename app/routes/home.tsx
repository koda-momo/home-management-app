import { TopPage } from '~/components';
import { pageInfo } from '~/utils/const';

export function meta() {
  return pageInfo.top;
}

/**
 * TOPページ.
 */
export default function Top() {
  return <TopPage />;
}
