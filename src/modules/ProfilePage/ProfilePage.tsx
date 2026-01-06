import styles from './ProfilePage.module.scss';

import { Back } from '../shared/components/Back';
import { Sidebar } from './components/Sidebar';
import { useState } from 'react';
import { Orders } from './components/Orders';
import { Details } from './components/Details';

export type ProfileTab = 'details' | 'orders';

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('details');

  return (
    <section className={styles.account}>
      <div className={styles.account__wrapper}>
        <Back />

        <h1 className={styles.account__title}>Особистий кабінет</h1>

        <div className={styles.account__layout}>
          <Sidebar active={activeTab} onChange={setActiveTab} />

          <div className={styles.account__content}>
            {activeTab === 'details' && <Details />}
            {activeTab === 'orders' && <Orders />}
          </div>
        </div>
      </div>
    </section>
  );
};
