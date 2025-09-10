import { lazy } from 'react';

import Layout from '@/layout';
import lazyLoad from '../lazyLoad';

const listRouter = [
  {
    order: 2,
    element: <Layout />,
    children: [
      {
        path: '/user-list',
        element: lazyLoad(lazy(() => import('@/views/user-list'))),
        meta: { title: '用户列表页', requiresAuth: true }
      }
    ]
  }
];
export default listRouter;
