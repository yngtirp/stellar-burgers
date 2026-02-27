import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ResetPassword,
  ForgotPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import { Modal, OrderInfo, IngredientDetails } from '@components';
import { Routes, Route, useMatch } from 'react-router-dom';
import { Layout } from './Layout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUserThunk, getUserSelector } from '../../services/slices/authSlice';
import { ProtectedRoute } from '../protected-route/protected-route';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch, getUserThunk]);

  const profileMatch = useMatch('/profile/orders/:number')?.params.number;
  const feedMatch = useMatch('/feed/:number')?.params.number;
  const orderNumber = profileMatch || feedMatch;
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Route>
        <Route element={<ProtectedRoute onlyAuth redirectPath='/login' />}>
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title={`#${orderNumber && orderNumber.padStart(6, '0')}`}>
                <OrderInfo />
              </Modal>
            }
          />
        </Route>
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/feed/:number'
          element={
            <Modal title={`#${orderNumber && orderNumber.padStart(6, '0')}`}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента'>
              <IngredientDetails />
            </Modal>
          }
        />
      </Route>
    </Routes>
  );
};
export default App;
