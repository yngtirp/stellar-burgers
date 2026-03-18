import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import {
  getOrders,
  getOrdersSelector
} from '../../services/slices/orders/ordersSlice';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredients/IngredientsSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch, getIngredients]);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch, getOrders]);
  /** TODO: взять переменную из стора */
  const orders = useSelector(getOrdersSelector);

  return <ProfileOrdersUI orders={orders} />;
};
