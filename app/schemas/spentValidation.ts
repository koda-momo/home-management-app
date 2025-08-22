import { z } from 'zod';
import { errorMessages } from '~/utils/const';

const amountValidation = z
  .number()
  .min(0, errorMessages.amountPositive)
  .max(9999999999, errorMessages.amountMaxLength);

export const spentSchema = z.object({
  credit: amountValidation,
  electricity: amountValidation,
  gas: amountValidation,
  water: amountValidation,
  other: amountValidation,
});

export type SpentFormData = z.infer<typeof spentSchema>;
