import { z } from 'zod';
import { errorMessages } from '~/utils/const';

const amountValidation = z
  .string()
  .min(1, errorMessages.amountRequired)
  .max(10, errorMessages.amountMaxLength)
  .refine((val) => !isNaN(Number(val)), {
    message: errorMessages.amountRequired,
  })
  .refine((val) => Number(val) >= 0, {
    message: errorMessages.amountPositive,
  });

export const spentSchema = z.object({
  credit: amountValidation,
  electricity: amountValidation,
  gas: amountValidation,
  water: amountValidation,
  other: amountValidation,
});

export type SpentFormData = z.infer<typeof spentSchema>;
