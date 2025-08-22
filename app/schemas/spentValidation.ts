import { z } from 'zod';
import { errorMessages } from '~/utils/const';

const amountValidation = z
  .string()
  .min(1, errorMessages.amountRequired)
  .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: errorMessages.amountRequired,
  });

export const spentSchema = z.object({
  credit: amountValidation,
  electricity: amountValidation,
  gas: amountValidation,
  water: amountValidation,
  other: amountValidation,
});

export type SpentFormData = z.infer<typeof spentSchema>;
