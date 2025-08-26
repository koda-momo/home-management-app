import axios from 'axios';
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
    return response.data;
  } catch {
    return {
      credit: undefined,
      electricity: undefined,
      gas: undefined,
      water: 0,
      other: 0,
    };
  }
};

/**
 * 家計簿ページ.
 */
export default function householdAccountBook() {
  return <HouseholdAccountBookPage />;
}
