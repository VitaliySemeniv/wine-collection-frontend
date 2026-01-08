import { useState } from 'react';
import { TextField } from '@mui/material';
import styles from './ChangePassword.module.scss';

const textFieldSx = {
  '& .MuiInputBase-root': {
    fontFamily: 'inherit',
    fontSize: '16px',
  },
  '& .MuiInputLabel-root': {
    fontFamily: 'inherit',
    color: '#6B7280',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#172031',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#E0E0E0',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#172031',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#172031',
  },
};

export const ChangePassword = () => {
  const [values, setValues] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form className={styles['change-password-form']} onSubmit={handleSubmit}>
      <h2 className={styles['change-password-form__title']}>Зміна пароля</h2>

      <div className={styles['change-password-form__fields']}>
        <TextField
          label="Поточний пароль"
          type="password"
          value={values.currentPassword}
          onChange={handleChange('currentPassword')}
          fullWidth
          sx={textFieldSx}
        />

        <TextField
          label="Новий пароль"
          type="password"
          value={values.newPassword}
          onChange={handleChange('newPassword')}
          fullWidth
          sx={textFieldSx}
        />

        <TextField
          label="Підтвердити новий пароль"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange('confirmPassword')}
          fullWidth
          sx={textFieldSx}
        />
      </div>

      <button type="submit" className={styles['change-password-form__button']}>
        Змінити пароль
      </button>
    </form>
  );
};
