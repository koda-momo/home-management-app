import type { FC } from 'react';
import * as styles from './Info.css';
import { infoList } from '~/utils/const';
import { Tag } from '~/components/common';

/**
 * お知らせ一覧.
 */
export const Info: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.infoTitle}>お知らせ</div>
      <ul className={styles.ul}>
        {infoList.map(({ date, text, category }, index) => (
          <li key={index} className={styles.list}>
            <div className={styles.title}>
              <Tag category={category} />
              {date}
            </div>
            <div>{text}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
