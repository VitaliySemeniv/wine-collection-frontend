import { useEffect, useState } from 'react';
import { getMe } from '../../../shared/api/auth';
import type { User } from '../../../../types/User';
import styles from './Details.module.scss';

export const Details = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getMe().then(setUser);
  }, []);

  if (!user) return <p>Завантаження...</p>;

  return (
    <section className={styles.details}>
      <h2 className={styles.details__title}>Особисті дані</h2>

      <div className={styles.details__list}>
        <div className={styles.details__row}>
          <span className={styles.details__label}>Імʼя</span>
          <span className={styles.details__value}>{user.first_name}</span>
        </div>

        <div className={styles.details__row}>
          <span className={styles.details__label}>Прізвище</span>
          <span className={styles.details__value}>{user.last_name}</span>
        </div>

        <div className={styles.details__row}>
          <span className={styles.details__label}>Email</span>
          <span className={styles.details__value}>{user.email}</span>
        </div>

        <div className={styles.details__row}>
          <span className={styles.details__label}>Телефон</span>
          <span className={styles.details__value}>{user.phone}</span>
        </div>

        {user.birth_date && (
          <div className={styles.details__row}>
            <span className={styles.details__label}>Дата народження</span>
            <span className={styles.details__value}>
              {new Date(user.birth_date).toLocaleDateString('uk-UA')}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
