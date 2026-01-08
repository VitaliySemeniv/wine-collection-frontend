import { useState } from 'react';
import styles from '../LoginForm/LoginForm.module.scss';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Props {
  onSwitch: () => void;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  birthDate?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const RegisterForm: React.FC<Props> = ({ onSwitch }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'Введіть імʼя';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Введіть прізвище';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Введіть номер телефону';
    } else if (!/^\+?\d[\d\s()-]{7,}$/.test(phone)) {
      newErrors.phone = 'Некоректний номер телефону';
    }

    if (!birthDate) {
      newErrors.birthDate = 'Вкажіть дату народження';
    }

    if (!email) {
      newErrors.email = 'Введіть електронну пошту';
    }

    if (!password) {
      newErrors.password = 'Введіть пароль';
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Паролі не співпадають';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      phone,
      birth_date: birthDate,
    };

    console.log(payload);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h1 className={styles.form__title}>Реєстрація</h1>

      <div className={styles.form__field}>
        <input
          className={`${styles.form__input} ${errors.firstName ? styles['form__input-error'] : ''}`}
          type="text"
          placeholder="Імʼя"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            setErrors((prev) => ({ ...prev, firstName: undefined }));
          }}
        />
        {errors.firstName && <span className={styles.form__error}>{errors.firstName}</span>}
      </div>

      <div className={styles.form__field}>
        <input
          className={`${styles.form__input} ${errors.lastName ? styles['form__input-error'] : ''}`}
          type="text"
          placeholder="Прізвище"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            setErrors((prev) => ({ ...prev, lastName: undefined }));
          }}
        />
        {errors.lastName && <span className={styles.form__error}>{errors.lastName}</span>}
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
        <input
          className={`${styles.form__input} ${errors.phone ? styles['form__input-error'] : ''}`}
          type="tel"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setErrors((prev) => ({ ...prev, phone: undefined }));
          }}
        />
        {errors.phone && <span className={styles.form__error}>{errors.phone}</span>}
      </div>

      <div className={styles.form__field}>
        <input
          className={`${styles.form__input} ${errors.birthDate ? styles['form__input-error'] : ''}`}
          type="date"
          value={birthDate}
          onChange={(e) => {
            setBirthDate(e.target.value);
            setErrors((prev) => ({ ...prev, birthDate: undefined }));
          }}
        />
        {errors.birthDate && <span className={styles.form__error}>{errors.birthDate}</span>}
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
