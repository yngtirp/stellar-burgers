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
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useMatch
} from 'react-router-dom';
import { Layout } from './Layout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/IngredientsSlice';
import { getOrderDetailsSelector } from 'src/services/slices/orderDetailsSlice';

const App = () => {
  const profileMatch = useMatch('/profile/orders/:number')?.params.number;
  const feedMatch = useMatch('/feed/:number')?.params.number;
  const orderNumber = profileMatch || feedMatch;
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
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
        <Route
          path='/profile/orders/:number'
          element={
            <Modal title=''>
              <OrderInfo />
            </Modal>
          }
        />
      </Route>
    </Routes>
  );
};
export default App;
