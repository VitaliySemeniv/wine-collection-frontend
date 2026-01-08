import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import styles from '../LoginForm/LoginForm.module.scss';

interface Props {
  onSwitch: () => void;
}

interface Errors {
  email?: string;
  password?: string;
}

export const LoginForm: React.FC<Props> = ({ onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!email) {
      newErrors.email = 'Введіть електронну пошту';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Некоректний email';
    }

    if (!password) {
      newErrors.password = 'Введіть пароль';
    } else if (password.length < 6) {
      newErrors.password = 'Пароль має містити мінімум 6 символів';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    console.log({ email, password });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h1 className={styles.form__title}>Увійти</h1>

      <div className={styles.form__field}>
        <input
          className={`${styles.form__input} ${errors.email ? styles['form__input-error'] : ''}`}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Ел. пошта"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: undefined }));
          }}
        />
        {errors.email && <span className={styles.form__error}>{errors.email}</span>}
      </div>

      <div className={styles.form__field}>
        <div className={styles.form__password}>
          <input
            className={`${styles.form__input} ${errors.password ? styles.form__input_error : ''}`}
            type={showPassword ? 'text' : 'password'}
            name="password"
            autoComplete="current-password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: undefined }));
            }}
          />

          <button
            type="button"
            className={styles.form__eye}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </button>
        </div>

        {errors.password && <span className={styles.form__error}>{errors.password}</span>}
      </div>

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
