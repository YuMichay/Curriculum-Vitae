import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import RouteLayout from './RouteLayout';

const RegisterPage = React.lazy(() => import('../../pages/auth/signup/SignupPage'));
const LoginPage = React.lazy(() => import('../../pages/auth/login/LoginPage'));
const ForgotPasswordPage = React.lazy(() => import('../../pages/auth/forgot-password/ForgotPassword'));
const ResetPasswordPage = React.lazy(() => import('../../pages/auth/reset-password/ResetPassword'));

const RoutesWrapper: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<PrivateRoute />}>
      </Route>
      <Route path='/auth' element={<RouteLayout isAuthPage={true} />}>
        <Route path='signup' element={<RegisterPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route index element={<Navigate to='signup' />} />
      </Route>
      <Route path='/auth/forgot-password' element={<ForgotPasswordPage />} />
      <Route path='/auth/reset-password' element={<ResetPasswordPage />} />
      <Route path='*' element={<Navigate to='/auth' />} />
    </Routes>
  )
}

export default RoutesWrapper;