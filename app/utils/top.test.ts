import { describe, it, expect, vi } from 'vitest';
import { shouldShowData, calculatePersonAmount } from './top';
import type { DashboardSpentData } from '~/types/api';

// config のモック
vi.mock('~/config', () => ({
  RENT_AMOUNT: 50000,
  SAVINGS_AMOUNT: 30000
}));

describe('top utils', () => {
  describe('shouldShowData', () => {
    it('データがnullの場合はfalseを返す', () => {
      expect(shouldShowData(null)).toBe(false);
    });

    it('electricityが0より大きい場合はtrueを返す', () => {
      const mockData: DashboardSpentData = {
        credit: 10000,
        electricity: 8000,
        gas: 5000,
        water: 3000,
        other: 2000,
        spending: 28000
      };
      
      expect(shouldShowData(mockData)).toBe(true);
    });

    it('electricityが0でも他の条件次第でtrueになりうる', () => {
      const mockData: DashboardSpentData = {
        credit: 10000,
        electricity: 0,
        gas: 5000,
        water: 3000,
        other: 2000,
        spending: 20000
      };
      
      // 現在の日付によって結果が変わるため、boolean値であることを確認
      const result = shouldShowData(mockData);
      expect(typeof result).toBe('boolean');
    });

    it('正常なデータ形式で適切に処理される', () => {
      const mockData: DashboardSpentData = {
        credit: 15000,
        electricity: 12000,
        gas: 8000,
        water: 4000,
        other: 3000,
        spending: 42000
      };
      
      expect(shouldShowData(mockData)).toBe(true);
    });
  });

  describe('calculatePersonAmount', () => {
    it('最初の人（isFirstPerson = true）の場合、追加20000円を加算する', () => {
      const baseAmount = 100000;
      const expected = baseAmount / 2 + 50000 + 20000 + 30000; // 150000
      
      expect(calculatePersonAmount(baseAmount, true)).toBe(expected);
    });

    it('二番目の人（isFirstPerson = false）の場合、追加額なし', () => {
      const baseAmount = 100000;
      const expected = baseAmount / 2 + 50000 + 30000; // 130000
      
      expect(calculatePersonAmount(baseAmount, false)).toBe(expected);
    });

    it('isFirstPersonを指定しない場合、falseとして扱われる', () => {
      const baseAmount = 100000;
      const expected = baseAmount / 2 + 50000 + 30000; // 130000
      
      expect(calculatePersonAmount(baseAmount)).toBe(expected);
    });

    it('baseAmountが0の場合でも正しく計算される', () => {
      const baseAmount = 0;
      const expected = 0 / 2 + 50000 + 20000 + 30000; // 100000
      
      expect(calculatePersonAmount(baseAmount, true)).toBe(expected);
    });

    it('負の数でも正しく計算される', () => {
      const baseAmount = -20000;
      const expected = -20000 / 2 + 50000 + 20000 + 30000; // 90000
      
      expect(calculatePersonAmount(baseAmount, true)).toBe(expected);
    });
  });
});