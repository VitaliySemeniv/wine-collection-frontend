import { useState } from 'react';
import styles from '../LoginForm/LoginForm.module.scss';

interface Props {
  onSwitch: () => void;
}

export const LoginForm: React.FC<Props> = ({ onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className={styles.form}>
      <h1 className={styles.form__title}>Увійти</h1>

      <input
        className={styles.form__input}
        type="email"
        placeholder="Ел. пошта"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className={styles.form__input}
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button className={styles.form__button} type="submit">
        Увійти
      </button>

      <p className={styles.form__text}>
        Ще не зареєстровані?{' '}
        <button type="button" className={styles.form__link} onClick={onSwitch}>
          Зареєструватись
        </button>
      </p>
    </form>
  );
};
