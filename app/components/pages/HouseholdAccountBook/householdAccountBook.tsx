import type { FC } from 'react';
import { useNavigate } from 'react-router';
import { Button, H1, Input } from '~/components';
import { useSpent } from '~/hooks';
import type { MonthlySpentData } from '~/types/api';
import * as styles from './householdAccountBook.css';

interface Props {
  data: MonthlySpentData;
}

/**
 * 家計簿ページ.
 */
export const HouseholdAccountBookPage: FC<Props> = ({ data }) => {
  const { register, handleSubmit, errors, isValid, submitSpentData } =
    useSpent(data);
  const navigate = useNavigate();

  const gotoTop = () => {
    navigate('/');
  };

  return (
    <>
      <H1>家計簿登録ページ</H1>
      <form onSubmit={handleSubmit(submitSpentData)}>
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

        <div className={styles.buttonWrapper}>
          <Button type="submit" disabled={!isValid}>
            登録する
          </Button>
          <Button type="button" onClick={gotoTop}>
            TOPに戻る
          </Button>
        </div>
      </form>
    </>
  );
};
