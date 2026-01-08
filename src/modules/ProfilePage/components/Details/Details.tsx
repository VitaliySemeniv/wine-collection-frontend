import styles from './Details.module.scss';

const userMock = {
  first_name: 'Юлія',
  last_name: 'Фітьо',
  email: 'jylia.fito@gmail.com',
  phone: '+380991234567',
  birth_date: '2004-04-18',
};

export const Details = () => {
  return (
    <section className={styles.details}>
      <h2 className={styles.details__title}>Особисті дані</h2>

      <div className={styles.details__list}>
        <div className={styles.details__row}>
          <span className={styles.details__label}>Імʼя</span>
          <span className={styles.details__value}>{userMock.first_name}</span>
        </div>

        <div className={styles.details__row}>
          <span className={styles.details__label}>Прізвище</span>
          <span className={styles.details__value}>{userMock.last_name}</span>
        </div>

        <div className={styles.details__row}>
          <span className={styles.details__label}>Email</span>
          <span className={styles.details__value}>{userMock.email}</span>
        </div>

        <div className={styles.details__row}>
          <span className={styles.details__label}>Телефон</span>
          <span className={styles.details__value}>{userMock.phone}</span>
        </div>

        <div className={styles.details__row}>
          <span className={styles.details__label}>Дата народження</span>
          <span className={styles.details__value}>
            {new Date(userMock.birth_date).toLocaleDateString('uk-UA')}
          </span>
        </div>
      </div>
    </section>
  );
};
