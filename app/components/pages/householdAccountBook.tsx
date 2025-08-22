import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '~/components';
import { useSpent } from '~/hooks';
import { spentSchema, type SpentFormData } from '~/schemas/spentValidation';

/**
 * 家計簿ページ.
 */
export const HouseholdAccountBookPage: FC = () => {
  const { submitSpentData } = useSpent();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SpentFormData>({
    resolver: zodResolver(spentSchema),
    mode: 'onChange',
    defaultValues: {
      credit: 0,
      electricity: 0,
      gas: 0,
      water: 0,
      other: 0,
    },
  });

  const onSubmit = (data: SpentFormData) => {
    // 念のため送信前に負の値をチェック
    const hasNegativeValue = Object.values(data).some((value) => value < 0);
    if (hasNegativeValue) {
      alert('負の値は入力できません');
      return;
    }
    submitSpentData(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="ガス代"
        type="number"
        min="0"
        {...register('gas', { valueAsNumber: true })}
        error={errors.gas?.message}
      />
      <Input
        label="電気代"
        type="number"
        min="0"
        {...register('electricity', { valueAsNumber: true })}
        error={errors.electricity?.message}
      />
      <Input
        label="水道代"
        type="number"
        min="0"
        {...register('water', { valueAsNumber: true })}
        error={errors.water?.message}
      />
      <Input
        label="カード代"
        type="number"
        min="0"
        {...register('credit', { valueAsNumber: true })}
        error={errors.credit?.message}
      />
      <Input
        label="その他"
        type="number"
        min="0"
        {...register('other', { valueAsNumber: true })}
        error={errors.other?.message}
      />
      <Button type="submit" disabled={!isValid}>
        登録する
      </Button>
    </form>
  );
};
