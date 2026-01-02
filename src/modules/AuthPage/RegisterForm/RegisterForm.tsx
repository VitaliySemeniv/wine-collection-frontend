import { useState } from 'react';
import styles from '../LoginForm/LoginForm.module.scss';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Props {
  onSwitch: () => void;
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const RegisterForm: React.FC<Props> = ({ onSwitch }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!name.trim()) {
      newErrors.name = 'Введіть імʼя';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Імʼя має містити мінімум 2 символи';
    } else if (!/^[A-Za-zА-Яа-яІіЇїЄєҐґ\s'-]+$/.test(name)) {
      newErrors.name = 'Імʼя може містити лише літери';
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Повторіть пароль';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Паролі не співпадають';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    console.log({ name, email, password });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h1 className={styles.form__title}>Реєстрація</h1>

      <div className={styles.form__field}>
        <input
          className={`${styles.form__input} ${errors.name ? styles['form__input-error'] : ''}`}
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Імʼя"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((prev) => ({ ...prev, name: undefined }));
          }}
        />
        {errors.name && <span className={styles.form__error}>{errors.name}</span>}
      </div>

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
            className={`${styles.form__input} ${
              errors.password ? styles['form__input-error'] : ''
            }`}
            type={showPassword ? 'text' : 'password'}
            name="password"
            autoComplete="new-password"
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

      <div className={styles.form__field}>
        <div className={styles.form__password}>
          <input
            className={`${styles.form__input} ${
              errors.confirmPassword ? styles['form__input-error'] : ''
            }`}
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Повторіть пароль"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
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

        {errors.confirmPassword && (
          <span className={styles.form__error}>{errors.confirmPassword}</span>
        )}
      </div>

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
