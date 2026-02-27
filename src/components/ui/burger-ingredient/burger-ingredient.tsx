import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './burger-ingredient.module.css';
import { changeIngredient } from '../../../services/slices/ingredientDetailsSlice';
import { useDispatch } from '../../../services/store';
import { useDrag } from 'react-dnd';

import {
  Counter,
  CurrencyIcon,
  AddButton
} from '@zlden/react-developer-burger-ui-components';

import { TBurgerIngredientUIProps } from './type';

export const BurgerIngredientUI: FC<TBurgerIngredientUIProps> = memo(
  ({ ingredient, count, handleAdd, locationState }) => {
    const dispatch = useDispatch();
    const [, dragRef] = useDrag(
      () => ({
        type: 'ingredient',
        item: ingredient
      }),
      [ingredient]
    );

    const hadleClick = () => {
      dispatch(changeIngredient(ingredient));
    };

    const { image, price, name, _id } = ingredient;

    return (
      <li className={styles.container} onClick={hadleClick}>
        <Link
          className={styles.article}
          to={`/ingredients/${_id}`}
          state={locationState}
        >
          {count && <Counter count={count} />}
          <img
            className={styles.img}
            src={image}
            alt='картинка ингредиента.'
            ref={dragRef}
          />
          <div className={`${styles.cost} mt-2 mb-2`}>
            <p className='text text_type_digits-default mr-2'>{price}</p>
            <CurrencyIcon type='primary' />
          </div>
          <p className={`text text_type_main-default ${styles.text}`}>{name}</p>
        </Link>
        <AddButton
          text='Добавить'
          onClick={handleAdd}
          extraClass={`${styles.addButton} mt-8`}
        />
      </li>
    );
  }
);
