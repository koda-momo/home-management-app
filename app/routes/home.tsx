import { title } from '~/utils/const';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: `TOP${title}` },
    { name: 'description', content: 'TOPページ' },
  ];
}

/**
 * TOPページ.
 */
export default function Home() {
  return (
    <main>
      <div>Home</div>
    </main>
  );
}
