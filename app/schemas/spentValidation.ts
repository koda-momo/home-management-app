import { z } from 'zod';
import { errorMessages } from '~/utils/const';

const amountValidation = z
  .string()
  .min(1, errorMessages.amountRequired) // 空文字列はエラー
  .max(10, errorMessages.amountMaxLength) // 10桁以内
  .refine(
    (val) => {
      // 数値に変換可能かチェック
      return !isNaN(Number(val)) && Number(val) % 1 === 0;
    },
    {
      message: errorMessages.amountRequired,
    }
  )
  .refine(
    (val) => {
      // 0以上の整数かチェック
      return Number(val) >= 0;
    },
    {
      message: errorMessages.amountPositive,
    }
  );

export const spentSchema = z.object({
  credit: amountValidation,
  electricity: amountValidation,
  gas: amountValidation,
  water: amountValidation,
  other: amountValidation,
});

export type SpentFormData = z.infer<typeof spentSchema>;
