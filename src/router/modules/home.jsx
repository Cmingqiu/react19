import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

import Layout from '@/layout';
import lazyLoad from '../lazyLoad';

const homeRouter = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: lazyLoad(lazy(() => import('@/views/Home'))),
        meta: { title: '首页', requiresAuth: false },
        children: [
          {
            path: '/about',
            element: (
              <div>
                关于
                <Outlet />
              </div>
            ),
            meta: { title: '关于', requiresAuth: true },
            children: [
              {
                path: '/about/about1',
                element: <div>关于1</div>,
                meta: { title: '关于1', requiresAuth: true }
              }
            ]
          }
        ]
      }
    ]
  }
];

export default homeRouter;
