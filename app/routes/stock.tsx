import axios from 'axios';
import { pageInfo } from '~/utils/const';
import { API_URL, API_ACCESS_KEY } from '~/config';
import { useLoaderData, redirect } from 'react-router';
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
    const response = await axios.get<StockResponse>(`${API_URL}/stock`, {
      headers: { 'x-api-key': API_ACCESS_KEY },
    });
    const data = response.data;

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return redirect('/login');
    }

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

  return <StockPage data={data} />;
}
