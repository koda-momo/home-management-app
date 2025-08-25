import type { FC } from 'react';
import { Button, H1, Input } from '~/components';
import { useSpent } from '~/hooks';

/**
 * 家計簿ページ.
 */
export const HouseholdAccountBookPage: FC = () => {
  const { register, handleSubmit, errors, isValid, submitSpentData } =
    useSpent();

  return (
    <>
      <H1>家計簿登録ページ</H1>
      <form onSubmit={handleSubmit(submitSpentData)}>
        <Input
          label="ガス代"
          {...register('gas')}
          error={errors.gas?.message}
        />
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
    </>
  );
};
