import { useState } from 'react';
import cn from 'classnames';
import styles from './Sidebar.module.scss';
import type { ProfileTab } from '../../ProfilePage';
import { logout } from '../../../shared/utils/auth';

type Props = {
  active: ProfileTab;
  onChange: (tab: ProfileTab) => void;
};

export const Sidebar = ({ active, onChange }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirmLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <>
      <aside className={styles.sidebar}>
        <nav className={styles.sidebar__nav}>
          <button
            className={cn(styles.sidebar__item, {
              [styles['sidebar__item--active']]: active === 'details',
            })}
            onClick={() => onChange('details')}
          >
            Особисті дані
          </button>

          <button
            className={cn(styles.sidebar__item, {
              [styles['sidebar__item--active']]: active === 'password',
            })}
            onClick={() => onChange('password')}
          >
            Змінити пароль
          </button>

          <button
            className={cn(styles.sidebar__item, {
              [styles['sidebar__item--active']]: active === 'orders',
            })}
            onClick={() => onChange('orders')}
          >
            Замовлення
          </button>

          <button className={styles.sidebar__item} onClick={handleLogoutClick}>
            Вийти
          </button>
        </nav>
      </aside>

      {isModalOpen && (
        <div className={styles.sidebar__modal}>
          <div className={styles['sidebar__modal-content']}>
            <p className={styles['sidebar__modal-title']}>Бажаєте вийти?</p>

            <div className={styles['sidebar__modal-actions']}>
              <button
                className={cn(
                  styles['sidebar__modal-button'],
                  styles['sidebar__modal-button--confirm'],
                )}
                onClick={handleConfirmLogout}
              >
                Так
              </button>

              <button
                className={cn(
                  styles['sidebar__modal-button'],
                  styles['sidebar__modal-button--cancel'],
                )}
                onClick={handleCancel}
              >
                Скасувати
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
