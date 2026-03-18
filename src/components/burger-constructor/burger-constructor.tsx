import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch } from '../../services/store';
import {
  getConstructorSelector,
  postOrder,
  setNullOrderModalData,
  setOrderRequest
} from '../../services/slices/constructor/constructorSlice';
import { getUserSelector } from '../../services/slices/auth/authSlice';
import { useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);
  const navigate = useNavigate();

  const constructorState = useSelector(getConstructorSelector);
  const constructorItems = constructorState.constructorItems;
  const orderRequest = constructorState.orderRequest;
  const orderModalData = constructorState.orderModalData;

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    else {
      const bunId = constructorItems.bun._id;
      const ingredientsIds = constructorItems.ingredients.map(
        (ingredient) => ingredient._id
      );
      const order = [bunId, ...ingredientsIds, bunId];
      dispatch(postOrder(order));
    }
  };
  const closeOrderModal = () => {
    dispatch(setNullOrderModalData());
    dispatch(setOrderRequest(false));
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
