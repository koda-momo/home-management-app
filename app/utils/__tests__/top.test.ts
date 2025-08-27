import { describe, it, expect, vi } from 'vitest';
import { calculatePersonAmount } from '../top';

// config のモック
vi.mock('~/config', () => ({
  RENT_AMOUNT: 50000,
  SAVINGS_AMOUNT: 30000,
}));

describe('top utils', () => {
  describe('calculatePersonAmount', () => {
    it('最初の人（isFirstPerson = true）の場合、追加20000円を加算する', () => {
      const baseAmount = 100000;
      const expected = Math.round(baseAmount / 2) + 50000 + 20000 + 30000; // 150000

      expect(calculatePersonAmount(baseAmount, true)).toBe(expected);
    });

    it('二番目の人（isFirstPerson = false）の場合、追加額なし', () => {
      const baseAmount = 100000;
      const expected = Math.round(baseAmount / 2) + 50000 + 30000; // 130000

      expect(calculatePersonAmount(baseAmount, false)).toBe(expected);
    });

    it('isFirstPersonを指定しない場合、falseとして扱われる', () => {
      const baseAmount = 100000;
      const expected = Math.round(baseAmount / 2) + 50000 + 30000; // 130000

      expect(calculatePersonAmount(baseAmount)).toBe(expected);
    });

    it('baseAmountが0の場合でも正しく計算される', () => {
      const baseAmount = 0;
      const expected = Math.round(0 / 2) + 50000 + 20000 + 30000; // 100000

      expect(calculatePersonAmount(baseAmount, true)).toBe(expected);
    });

    it('負の数でも正しく計算される', () => {
      const baseAmount = -20000;
      const expected = Math.round(-20000 / 2) + 50000 + 20000 + 30000; // 90000

      expect(calculatePersonAmount(baseAmount, true)).toBe(expected);
    });
  });
});
