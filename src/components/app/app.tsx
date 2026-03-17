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
import { Routes, Route, useMatch, useLocation } from 'react-router-dom';
import { Layout } from './Layout';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { getUserThunk } from '../../services/slices/authSlice';
import { ProtectedRoute } from '../protected-route/protected-route';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch, getUserThunk]);

  const profileMatch = useMatch('/profile/orders/:number')?.params.number;
  const feedMatch = useMatch('/feed/:number')?.params.number;
  const orderNumber = profileMatch || feedMatch;
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  return (
    <>
      <Routes location={backgroundLocation || location}>
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
            <Route path='/profile/orders/:number' element={<ProfileOrders />} />
          </Route>
          <Route path='/feed/:number' element={<Feed />} />
          <Route path='/ingredients/:id' element={<ConstructorPage />} />
          <Route path='*' element={<NotFound404 />} />
        </Route>
      </Routes>

      <Routes>
        <Route element={<ProtectedRoute onlyAuth redirectPath='/login' />}>
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title={`#${orderNumber && orderNumber.padStart(6, '0')}`}
                pathOnClose='/profile/orders'
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Route>
        <Route
          path='/feed/:number'
          element={
            <Modal
              title={`#${orderNumber && orderNumber.padStart(6, '0')}`}
              pathOnClose='/feed'
            >
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента' pathOnClose='/'>
              <IngredientDetails />
            </Modal>
          }
        />
      </Routes>
    </>
  );
};
export default App;
