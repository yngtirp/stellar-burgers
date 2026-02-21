import '../../index.css';
import styles from './app.module.css';
import { AppHeader } from '@components';
import { Preloader } from '@ui';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  const isIngredientsLoading = false;
  const ingredients = [];
  const error = null;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Outlet />
    </div>
  );
};
