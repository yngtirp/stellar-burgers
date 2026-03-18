import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {
  getLoadingAuthSelector,
  getUserSelector
} from '../../services/slices/auth/authSlice';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

interface TProtectedRouteProps {
  onlyAuth?: boolean;
  redirectPath?: string;
}

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  onlyAuth,
  redirectPath = '/'
}) => {
  const user = useSelector(getUserSelector);
  const isLoading = useSelector(getLoadingAuthSelector);
  if (isLoading) return <Preloader />;

  if (onlyAuth && !user) {
    return <Navigate to={redirectPath} replace />;
  }

  if (!onlyAuth && user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
