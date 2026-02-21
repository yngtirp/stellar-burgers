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
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';

const App = () => (
  <BrowserRouter>
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
            <Modal title='' onClose={() => {}}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='' onClose={() => {}}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <Modal title='' onClose={() => {}}>
              <OrderInfo />
            </Modal>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
