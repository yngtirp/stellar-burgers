import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { getFeed, getOrdersSelector } from '../../services/slices/feedSlice';
import { useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/IngredientsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch, getFeed]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch, getIngredients]);

  const orders: TOrder[] = useSelector(getOrdersSelector);
  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
