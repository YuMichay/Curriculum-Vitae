import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import PrivateRoute from './PrivateRoute.tsx';
import RouteLayout from './RouteLayout.tsx';

const RegisterPage = React.lazy(() => import('../../pages/auth/signup/SignupPage.tsx'));
const LoginPage = React.lazy(() => import('../../pages/auth/login/LoginPage.tsx'));
const ForgotPasswordPage = React.lazy(() => import('../../pages/auth/forgot-password/ForgotPasswordPage.tsx'));
const ResetPasswordPage = React.lazy(() => import("../../pages/auth/reset-password/ResetPasswordPage"));
const VerifyEmailPage = React.lazy(() => import("../../pages/auth/verify-email/VerifyEmailPage"));

const RoutesWrapper: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<PrivateRoute />}></Route>
      <Route path='/auth' element={<RouteLayout isAuthPage={true} />}>
        <Route path='signup' element={<RegisterPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route index element={<Navigate to='signup' />} />
      </Route>
      <Route path='/auth/forgot-password' element={<ForgotPasswordPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path='*' element={<Navigate to='/auth' />} />
    </Routes>
  )
}

export default RoutesWrapper;
