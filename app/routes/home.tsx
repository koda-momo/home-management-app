import axios from 'axios';
import { useLoaderData, redirect } from 'react-router';
import { TopPage } from '~/components';
import { API_URL, API_ACCESS_KEY } from '~/config';
import type { DashboardSpentData } from '~/types/api';
import { pageInfo } from '~/utils/const';

export function meta() {
  return pageInfo.top;
}

export const loader = async () => {
  try {
    const response = await axios.get<DashboardSpentData>(
      `${API_URL}/spent/month`,
      { headers: { 'x-api-key': API_ACCESS_KEY } }
    );
    return response.data;
  } catch (error) {
    console.dir('エラー' + JSON.stringify(error));
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return redirect('/login');
    }
    return null;
  }
};

/**
 * TOPページ.
 */
export default function Top() {
  const data = useLoaderData() as DashboardSpentData | null;

  return <TopPage data={data} />;
}
