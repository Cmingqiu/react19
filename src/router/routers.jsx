import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Layout from '@/layout';
import Home from '@/views/Home';
import Login from '@/views/Login';

const List = lazy(() => import('@/views/List'));
const NOT_FOUND = lazy(() => import('@/views/NOT_FOUND'));

export const routes = [
  {
    path: '/login',
    element: <Login />,
    meta: { title: '登录', requiresAuth: false }
  },
  {
    element: Layout,
    meta: { title: 'Dashboard' },
    children: [
      {
        path: '/',
        element: <Home />,
        meta: { title: '首页', requiresAuth: true }
      },
      {
        path: 'list',
        element: <List />,
        meta: { title: '列表页', requiresAuth: true }
      }
    ]
  },
  { path: '*', element: <NOT_FOUND />, meta: { title: '404' } }
];
