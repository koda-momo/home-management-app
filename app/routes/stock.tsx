import axios from 'axios';
import { pageInfo } from '~/utils/const';
import { API_URL } from '~/config';
import { useLoaderData } from 'react-router';
import type { StockResponse } from '~/types/stock';
import { StockPage } from '~/components';

export function meta() {
  return pageInfo.stock;
}

/**
 * 在庫情報取得.
 */
export const loader = async () => {
  try {
    const response = await axios.get<StockResponse>(`${API_URL}/stock`);
    const data = response.data;

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  }
};

/**
 * 在庫管理ページ.
 */
export default function Stock() {
  const data: StockResponse = useLoaderData<typeof loader>();

  return (
    <main>
      <StockPage data={data} />
    </main>
  );
}
