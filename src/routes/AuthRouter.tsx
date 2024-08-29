import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthContextProvider } from '@/context/AuthContext';

import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';

export default function AuthRouter() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContextProvider>
  );
}
