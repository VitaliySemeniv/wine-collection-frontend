import { useState } from 'react';
import styles from '../LoginForm/LoginForm.module.scss';

interface Props {
  onSwitch: () => void;
}

export const RegisterForm: React.FC<Props> = ({ onSwitch }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className={styles.form}>
      <h1 className={styles.form__title}>Реєстрація</h1>

      <input
        className={styles.form__input}
        type="text"
        placeholder="Імʼя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

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
        Зареєструватись
      </button>

      <p className={styles.form__text}>
        Вже маєте акаунт?{' '}
        <button type="button" className={styles.form__link} onClick={onSwitch}>
          Увійти
        </button>
      </p>
    </form>
  );
};
