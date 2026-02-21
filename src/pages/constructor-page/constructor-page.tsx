import { useSelector } from '../../services/store';
import styles from './constructor-page.module.css';
import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import {
  getIngredientsSelector,
  getLoadingSelector,
  getErrorSelector
} from '../../services/slices/burgerIngridiensSlice';
import { useDispatch } from '../../services/store';
import { getIngredients } from '../../services/slices/burgerIngridiensSlice';

export const ConstructorPage: FC = () => {
  const ingredients = useSelector(getIngredientsSelector);
  const loading = useSelector(getLoadingSelector);
  const error = useSelector(getErrorSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch, getIngredients]);

  return (
    <main className={styles.containerMain}>
      {loading ? (
        <Preloader />
      ) : error ? (
        <div className={`${styles.error} text text_type_main-medium pt-4`}>
          {error}
        </div>
      ) : ingredients.length > 0 ? (
        <>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </>
      ) : (
        <div className={`${styles.title} text text_type_main-medium pt-4`}>
          Нет игредиентов
        </div>
      )}
    </main>
  );
};
