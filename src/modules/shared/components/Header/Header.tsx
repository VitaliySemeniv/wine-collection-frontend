import { Link, NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import styles from './Header.module.scss';
import { desktopNavLinks } from '../../../../constants/navLinks';
import { Icon } from '../Icon';
import { Menu } from '../Menu';
import { useState } from 'react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <header
        className={cn(styles.header, {
          [styles['header--menu-open']]: isMenuOpen,
        })}
      >
        <div className={styles['header__top-bar']}>
          <Link to="/" className={styles['header__logo-container']}>
            <img src={'./logo.svg'} alt={'Logo'} className={styles.header__logo} />
          </Link>

          <nav className={styles.header__nav}>
            <ul className={styles.header__list}>
              {desktopNavLinks
                .filter((link) => !link.onlyHome || isHomePage)
                .map((link) =>
                  link.type === 'route' ? (
                    <NavLink
                      key={link.title}
                      to={link.path}
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

          <div className={styles['header__icons-wrapper']}>
            <div className={styles['header__icon-container']} onClick={toggleMenu}>
              <Icon name={isMenuOpen ? 'close' : 'menu'} />
            </div>
          </div>

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

      <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </>
  );
};
