import styles from './Details.module.scss';

export const Details = () => {
  return (
    <section className={styles.details}>
      <h2 className={styles.details__title}>Особисті дані</h2>

      <div className={styles.details__list}>
        <div className={styles.details__row}>
          <span className={styles.details__label}>Імʼя</span>
          <span className={styles.details__value}>Юлія</span>
        </div>

        <div className={styles.details__row}>
          <span className={styles.details__label}>Email</span>
          <span className={styles.details__value}>jylia.fito@gmail.com</span>
        </div>
      </div>
    </section>
  );
};
