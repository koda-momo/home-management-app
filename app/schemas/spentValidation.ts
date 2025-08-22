import { z } from 'zod';

export const spentSchema = z.object({
  credit: z
    .string()
    .min(1, '金額は数字で入力してください')
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: '金額は数字で入力してください',
    }),
  electricity: z
    .string()
    .min(1, '金額は数字で入力してください')
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: '金額は数字で入力してください',
    }),
  gas: z
    .string()
    .min(1, '金額は数字で入力してください')
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: '金額は数字で入力してください',
    }),
  water: z
    .string()
    .min(1, '金額は数字で入力してください')
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: '金額は数字で入力してください',
    }),
  other: z
    .string()
    .min(1, '金額は数字で入力してください')
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: '金額は数字で入力してください',
    }),
});

export type SpentFormData = z.infer<typeof spentSchema>;
