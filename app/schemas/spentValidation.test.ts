import { describe, test, expect } from 'vitest';
import { spentSchema } from './spentValidation';

describe('spentValidation', () => {
  describe('正常なケース', () => {
    test('すべて"0"の場合', () => {
      const input = {
        credit: '0',
        electricity: '0',
        gas: '0',
        water: '0',
        other: '0',
      };
      const result = spentSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    test('正の数値文字列の場合', () => {
      const input = {
        credit: '1000',
        electricity: '5000',
        gas: '3000',
        water: '2000',
        other: '500',
      };
      const result = spentSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    test('最大桁数の場合', () => {
      const input = {
        credit: '9999999999',
        electricity: '9999999999',
        gas: '9999999999',
        water: '9999999999',
        other: '9999999999',
      };
      const result = spentSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe('異常なケース', () => {
    test('負の値文字列の場合', () => {
      const input = {
        credit: '-1',
        electricity: '0',
        gas: '0',
        water: '0',
        other: '0',
      };
      const result = spentSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['credit']);
        expect(result.error.issues[0].code).toBe('custom');
      }
    });

    test('複数の負の値文字列の場合', () => {
      const input = {
        credit: '-100',
        electricity: '-200',
        gas: '0',
        water: '0',
        other: '0',
      };
      const result = spentSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(2);
        expect(result.error.issues[0].path).toEqual(['credit']);
        expect(result.error.issues[1].path).toEqual(['electricity']);
      }
    });

    test('最大桁数を超える場合', () => {
      const input = {
        credit: '12345678901', // 11桁
        electricity: '0',
        gas: '0',
        water: '0',
        other: '0',
      };
      const result = spentSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['credit']);
        expect(result.error.issues[0].code).toBe('too_big');
      }
    });

    test('無効な文字列の場合', () => {
      const input = {
        credit: 'invalid',
        electricity: '0',
        gas: '0',
        water: '0',
        other: '0',
      };
      const result = spentSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['credit']);
        expect(result.error.issues[0].code).toBe('custom');
      }
    });

    test('空文字列の場合', () => {
      const input = {
        credit: '',
        electricity: '0',
        gas: '0',
        water: '0',
        other: '0',
      };
      const result = spentSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['credit']);
        expect(result.error.issues[0].code).toBe('too_small');
      }
    });

    test('undefinedの場合', () => {
      const input = {
        credit: undefined,
        electricity: '0',
        gas: '0',
        water: '0',
        other: '0',
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
        electricity: '0',
        gas: '0',
        water: '0',
        other: '0',
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
    test('負の値文字列が入力された場合', () => {
      // ユーザーがテキストフィールドに負の値を入力したケース
      const input = {
        credit: '-1',
        electricity: '0',
        gas: '0',
        water: '0',
        other: '0',
      };
      const result = spentSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('0以上');
      }
    });

    test('空文字列の場合', () => {
      // 入力フィールドが空の場合
      const input = {
        credit: '', // 空文字列
        electricity: '0',
        gas: '0',
        water: '0',
        other: '0',
      };
      const result = spentSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].code).toBe('too_small');
      }
    });

    test('小数点を含む数値文字列の場合', () => {
      // 小数点を含む数値が入力された場合
      const input = {
        credit: '100.5',
        electricity: '0',
        gas: '0',
        water: '0',
        other: '0',
      };
      const result = spentSchema.safeParse(input);
      expect(result.success).toBe(true); // 小数点も有効な数値として扱う
    });
  });
});
