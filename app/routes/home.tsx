import axios from 'axios';
import { useLoaderData } from 'react-router';
import { TopPage } from '~/components';
import { API_URL } from '~/config';
import type { DashboardSpentData } from '~/types/api';
import { pageInfo } from '~/utils/const';

export function meta() {
  return pageInfo.top;
}

export const loader = async () => {
  try {
    const response = await axios.get<DashboardSpentData>(
      `${API_URL}/spent/month`
    );
    return response.data;
  } catch {
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
