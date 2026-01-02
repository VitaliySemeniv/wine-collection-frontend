import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../LoginForm/LoginForm.module.scss';

interface Errors {
  email?: string;
}

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState<string>(location.state?.email || '');
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!email) {
      newErrors.email = 'Введіть електронну пошту';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Некоректний email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    console.log('Reset password for:', email);
    setSuccess(true);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h1 className={styles.form__title}>Відновлення пароля</h1>

      {!success ? (
        <>
          <p className={styles.form__description}>
            Вкажіть електронну пошту — ми надішлемо посилання для відновлення пароля
          </p>

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
                setErrors({});
              }}
            />
            {errors.email && <span className={styles.form__error}>{errors.email}</span>}
          </div>

          <button className={styles.form__button} type="submit">
            Надіслати
          </button>

          <p className={styles.form__text}>
            <button type="button" className={styles.form__link} onClick={() => navigate('/auth')}>
              Повернутись до входу
            </button>
          </p>
        </>
      ) : (
        <>
          <p className={styles.form__text}>
            📩 Посилання для відновлення пароля надіслано на
            <br />
            <strong>{email}</strong>
          </p>

          <button className={styles.form__button} type="button" onClick={() => navigate('/auth')}>
            До входу
          </button>
        </>
      )}
    </form>
  );
};
