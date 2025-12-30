import { Link, NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import styles from './Header.module.scss';
import { navLinks } from '../../../../constants/navLinks';
import { Icon } from '../Icon';

export const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <header className={styles.header}>
        <div className={styles['header__top-bar']}>
          <Link to="/" className={styles['header__logo-container']}>
            <img src={'./logo.svg'} alt={'Logo'} className={styles.header__logo} />
          </Link>

          <nav className={styles.header__nav}>
            <ul className={styles.header__list}>
              {navLinks
                .filter((link) => {
                  if (link.onlyHome) {
                    return isHomePage;
                  }

                  return true;
                })
                .map((link) =>
                  link.type === 'route' ? (
                    <NavLink
                      to={link.path}
                      key={link.title}
                      className={({ isActive }) =>
                        cn(styles.header__link, {
                          [styles['header__link--active']]: isActive,
                        })
                      }
                    >
                      {link.title}
                    </NavLink>
                  ) : (
                    <a key={link.title} href={link.path} className={styles.header__link}>
                      {link.title}
                    </a>
                  ),
                )}
            </ul>
          </nav>

          <div className={styles['header__icons-container']}>
            <NavLink
              to="/account"
              className={({ isActive }) =>
                cn(styles['header__icon'], {
                  [styles['header__icon--active']]: isActive,
                })
              }
            >
              <Icon name="account" />
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                cn(styles['header__icon'], {
                  [styles['header__icon--active']]: isActive,
                })
              }
            >
              <div className={styles['header__icon-wrapper']}>
                <Icon name="cart" />

                {/* {cartCount > 0 && <span className={styles['header__counter']}>{cartCount}</span>} */}
              </div>
            </NavLink>
          </div>
        </div>
      </header>
    </>
  );
};
