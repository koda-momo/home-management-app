import { describe, test, expect } from 'vitest';
import { spentSchema } from './spentValidation';

describe('spentValidation', () => {
  describe('正常なケース', () => {
    test('すべて0の場合', () => {
      const input = {
        credit: 0,
        electricity: 0,
        gas: 0,
        water: 0,
        other: 0,
      };
      const result = spentSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    test('正の数値の場合', () => {
      const input = {
        credit: 1000,
        electricity: 5000,
        gas: 3000,
        water: 2000,
        other: 500,
      };
      const result = spentSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    test('最大値の場合', () => {
      const input = {
        credit: 9999999999,
        electricity: 9999999999,
        gas: 9999999999,
        water: 9999999999,
        other: 9999999999,
      };
      const result = spentSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe('異常なケース', () => {
    test('負の値の場合', () => {
      const input = {
        credit: -1,
        electricity: 0,
        gas: 0,
        water: 0,
        other: 0,
      };
      const result = spentSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['credit']);
        expect(result.error.issues[0].code).toBe('too_small');
      }
    });

    test('複数の負の値の場合', () => {
      const input = {
        credit: -100,
        electricity: -200,
        gas: 0,
        water: 0,
        other: 0,
      };
      const result = spentSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(2);
        expect(result.error.issues[0].path).toEqual(['credit']);
        expect(result.error.issues[1].path).toEqual(['electricity']);
      }
    });

    test('最大値を超える場合', () => {
      const input = {
        credit: 10000000000, // 9999999999 + 1
        electricity: 0,
        gas: 0,
        water: 0,
        other: 0,
      };
      const result = spentSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['credit']);
        expect(result.error.issues[0].code).toBe('too_big');
      }
    });

    test('文字列の場合', () => {
      const input = {
        credit: 'invalid',
        electricity: 0,
        gas: 0,
        water: 0,
        other: 0,
      };
      const result = spentSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['credit']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    test('undefinedの場合', () => {
      const input = {
        credit: undefined,
        electricity: 0,
        gas: 0,
        water: 0,
        other: 0,
      };
      const result = spentSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['credit']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    test('nullの場合', () => {
      const input = {
        credit: null,
        electricity: 0,
        gas: 0,
        water: 0,
        other: 0,
      };
      const result = spentSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['credit']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    test('NaNの場合', () => {
      const input = {
        credit: NaN,
        electricity: 0,
        gas: 0,
        water: 0,
        other: 0,
      };
      const result = spentSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['credit']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    test('Infinityの場合', () => {
      const input = {
        credit: Infinity,
        electricity: 0,
        gas: 0,
        water: 0,
        other: 0,
      };
      const result = spentSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['credit']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });
  });

  describe('React Hook Formとの連携を想定したテスト', () => {
    test('valueAsNumberで-1が設定された場合', () => {
      // React Hook Formのvalues.asNumberで負の値が入る可能性があるケース
      const input = {
        credit: -1,
        electricity: 0,
        gas: 0,
        water: 0,
        other: 0,
      };
      const result = spentSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('0以上');
      }
    });

    test('空文字列から0に変換されるケース', () => {
      // 入力フィールドが空の場合、valueAsNumberでNaNになる可能性
      const input = {
        credit: NaN, // 空文字列のvalueAsNumberはNaN
        electricity: 0,
        gas: 0,
        water: 0,
        other: 0,
      };
      const result = spentSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });
});
