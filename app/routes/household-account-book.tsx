import axios from 'axios';
import { useLoaderData } from 'react-router';
import { HouseholdAccountBookPage } from '~/components';
import { API_URL } from '~/config';
import type { MonthlySpentData } from '~/types/api';
import { pageInfo } from '~/utils/const';

export function meta() {
  return pageInfo.householdAccountBook;
}

export const loader = async () => {
  try {
    const response = await axios.get<MonthlySpentData>(
      `${API_URL}/spent/month`
    );
    return new Response(JSON.stringify(response.data), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  } catch {
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
