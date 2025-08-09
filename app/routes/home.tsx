import { title } from '~/utils/const';

export function meta() {
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
