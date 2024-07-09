import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Layout from '@/layout';
import Home from '@/views/Home';
import Login from '@/views/Login';
import NOT_FOUND from '@/views/NOT_FOUND';

import lazyLoad from './lazyLoad';

export const routes = [
  {
    path: '/login',
    element: <Login />,
    meta: { title: '登录', requiresAuth: false }
  },
  {
    element: <Layout />,
    meta: { title: 'Dashboard' },
    children: [
      {
        path: '/',
        element: <Home />,
        meta: { title: '首页', requiresAuth: true }
      },
      {
        path: '/list',
        element: lazyLoad(lazy(() => import('@/views/List/index'))),
        meta: { title: '列表页', requiresAuth: true }
      }
    ]
  },
  { path: '*', element: <NOT_FOUND />, meta: { title: '404' } }
];
