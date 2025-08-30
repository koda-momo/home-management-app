import type { FC } from 'react';
import * as styles from './Tag.css';
import type { Info } from '~/types/top';

interface TagProps {
  category: Info['category'];
}

export const Tag: FC<TagProps> = ({ category }) => {
  const categoryList = {
    new: '新規',
    update: '更新',
    fix: '修正',
  };

  return (
    <div className={`${styles.tag} ${styles.category[category]}`}>
      {categoryList[category]}
    </div>
  );
};
