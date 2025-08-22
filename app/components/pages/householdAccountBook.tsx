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
  });

  const onSubmit = (data: SpentFormData) => {
    // 念のため送信前に負の値をチェック
    const hasNegativeValue = Object.values(data).some(
      (value) => Number(value) < 0
    );
    if (hasNegativeValue) {
      alert('負の値は入力できません');
      return;
    }
    submitSpentData(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="ガス代" {...register('gas')} error={errors.gas?.message} />
      <Input
        label="電気代"
        {...register('electricity')}
        error={errors.electricity?.message}
      />
      <Input
        label="水道代"
        {...register('water')}
        error={errors.water?.message}
      />
      <Input
        label="カード代"
        {...register('credit')}
        error={errors.credit?.message}
      />
      <Input
        label="その他"
        {...register('other')}
        error={errors.other?.message}
      />
      <Button type="submit" disabled={!isValid}>
        登録する
      </Button>
    </form>
  );
};
