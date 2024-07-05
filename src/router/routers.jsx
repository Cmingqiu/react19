import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Home from '@/views/Home';
import Login from '@/views/Login';

const List = lazy(() => import('@/views/List'));

export const routes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/list', element: <List /> },
  { path: '*', element: <Navigate to='/' /> }
];
