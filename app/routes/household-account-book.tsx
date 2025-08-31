import axios from 'axios';
import { useLoaderData, redirect } from 'react-router';
import { HouseholdAccountBookPage } from '~/components';
import { API_URL, API_ACCESS_KEY } from '~/config';
import type { MonthlySpentData } from '~/types/api';
import { pageInfo } from '~/utils/const';

export function meta() {
  return pageInfo.householdAccountBook;
}

export const loader = async () => {
  try {
    const response = await axios.get<MonthlySpentData>(
      `${API_URL}/spent/month`,
      {
        headers: { 'x-api-key': API_ACCESS_KEY },
      }
    );
    return new Response(JSON.stringify(response.data), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return redirect('/login');
    }
    return new Response(
      JSON.stringify({
        credit: undefined,
        other: 0,
      }),
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );
  }
};

/**
 * 家計簿ページ.
 */
export default function HouseholdAccountBook() {
  const data: MonthlySpentData = useLoaderData<typeof loader>();

  return <HouseholdAccountBookPage data={data} />;
}
