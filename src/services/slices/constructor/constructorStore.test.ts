import { TNewOrderResponse } from '@api';
import {
  constructorSlice,
  addIngredient,
  removeIngredient,
  moveIngredientToDown,
  moveIngredientToUp,
  setNullOrderModalData,
  setOrderRequest,
  initialState,
  postOrder
} from './constructorSlice';
import { TIngredient, TOrder } from '@utils-types';

const reducer = constructorSlice.reducer;

describe('тест constructorSlice', () => {
  const mockBun: TIngredient = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const mockMainIngredient: TIngredient = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const mockSauce: TIngredient = {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };

  const mockOrderModalData: TOrder = {
    _id: 'test',
    status: 'test',
    name: 'test',
    createdAt: 'test',
    updatedAt: 'test',
    number: 0,
    ingredients: []
  };

  const mockNewOrderResponse: TNewOrderResponse = {
    order: mockOrderModalData,
    name: 'test',
    success: true
  };

  describe('test addIngredient', () => {
    it('тест добавления булки', () => {
      const state = reducer(initialState, addIngredient(mockBun));

      expect(state.constructorItems.bun).toMatchObject(mockBun);
      expect(state.constructorItems.ingredients).toEqual([]);
    });

    it('тест добавления начинки', () => {
      const state = reducer(initialState, addIngredient(mockMainIngredient));

      expect(state.constructorItems.ingredients).toHaveLength(1);
      expect(state.constructorItems.bun).toBeNull();
      expect(state.constructorItems.ingredients[0]).toMatchObject(
        mockMainIngredient
      );
    });

    it('тест добавления соуса', () => {
      const state = reducer(initialState, addIngredient(mockSauce));

      expect(state.constructorItems.ingredients).toHaveLength(1);
      expect(state.constructorItems.bun).toBeNull();
      expect(state.constructorItems.ingredients[0]).toMatchObject(mockSauce);
    });

    it('тест добавления нескольких ингредиентов', () => {
      let state = reducer(initialState, addIngredient(mockSauce));
      state = reducer(state, addIngredient(mockMainIngredient));
      state = reducer(state, addIngredient(mockBun));

      expect(state.constructorItems.ingredients).toHaveLength(2);
      expect(state.constructorItems.bun).toMatchObject(mockBun);
      expect(state.constructorItems.ingredients[0]).toMatchObject(mockSauce);
      expect(state.constructorItems.ingredients[1]).toMatchObject(
        mockMainIngredient
      );
    });

    it('тест обновления булки', () => {
      const newBun = { ...mockBun, _id: 'new_bun', name: 'new_bun' };
      let state = reducer(initialState, addIngredient(mockBun));
      state = reducer(state, addIngredient(newBun));

      expect(state.constructorItems.bun).toMatchObject(newBun);
    });
  });

  describe('test removeIngredient', () => {
    it('тест удаления ингредиента (1 ингредиент в стейте)', () => {
      let state = reducer(initialState, addIngredient(mockSauce));
      const id = state.constructorItems.ingredients[0].id;
      state = reducer(state, removeIngredient(id));

      expect(state.constructorItems.ingredients).toHaveLength(0);
    });

    it('тест удаления ингредиента (2+ ингредиента в стейте)', () => {
      let state = reducer(initialState, addIngredient(mockSauce));
      state = reducer(state, addIngredient(mockMainIngredient));
      const sauceId = state.constructorItems.ingredients[0].id;
      state = reducer(state, removeIngredient(sauceId));

      expect(state.constructorItems.ingredients).toHaveLength(1);
      expect(state.constructorItems.ingredients[0]).toMatchObject(
        mockMainIngredient
      );
    });
  });

  describe('test moveIngredientToUp', () => {
    it('тест передвижения ингредиента вверх', () => {
      let state = reducer(initialState, addIngredient(mockSauce));
      state = reducer(state, addIngredient(mockMainIngredient));
      state = reducer(state, moveIngredientToUp(1));

      expect(state.constructorItems.ingredients[0]).toMatchObject(
        mockMainIngredient
      );
    });
  });

  describe('test moveIngredientToDown', () => {
    it('тест передвижения ингредиента вниз', () => {
      let state = reducer(initialState, addIngredient(mockSauce));
      state = reducer(state, addIngredient(mockMainIngredient));
      state = reducer(state, moveIngredientToDown(0));

      expect(state.constructorItems.ingredients[1]).toMatchObject(mockSauce);
    });
  });

  describe('test setNullOrderModalData', () => {
    it('тест обнуления данных модалки', () => {
      let state = reducer(
        { ...initialState, orderModalData: mockOrderModalData },
        { type: '' }
      );
      state = reducer(state, setNullOrderModalData());

      expect(state.orderModalData).toBeNull();
    });
  });

  describe('test setOrderRequest', () => {
    it('тест установки флага orderRequest', () => {
      let state = reducer(initialState, setOrderRequest(true));
      expect(state.orderRequest).toBe(true);

      state = reducer(state, setOrderRequest(false));
      expect(state.orderRequest).toBe(false);
    });
  });

  describe('test postOrder', () => {
    it('тест postOrder.pending', () => {
      const state = reducer(initialState, { type: postOrder.pending.type });

      expect(state.orderRequest).toBe(true);
      expect(state.error).toBeNull();
    });

    it('тест postOrder.rejected', () => {
      const state = reducer(initialState, {
        type: postOrder.rejected.type,
        error: { message: 'helloWorld(console.log)' }
      });

      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe('helloWorld(console.log)');
    });

    it('тест postOrder.fulfilled', () => {
      const state = reducer(initialState, {
        type: postOrder.fulfilled.type,
        payload: mockNewOrderResponse
      });

      expect(state.orderRequest).toBe(false);
      expect(state.error).toBeNull();
      expect(state.orderModalData).toEqual(mockOrderModalData);
      expect(state.constructorItems.bun).toBeNull();
      expect(state.constructorItems.ingredients).toEqual([]);
    });
  });
});
