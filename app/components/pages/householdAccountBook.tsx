import type { FC } from 'react';
import { Button, Input } from '~/components';
import { useSpent } from '~/hooks';

/**
 * 家計簿ページ.
 */
export const HouseholdAccountBookPage: FC = () => {
  const { submitSpentData } = useSpent();

  return (
    <>
      <Input label="ガス代" />
      <Input label="電気代" />
      <Input label="水道代" />
      <Input label="カード代" />
      <Input label="その他" />
      <Button onClick={submitSpentData}>登録する</Button>
    </>
  );
};
