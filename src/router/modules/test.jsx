import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

import Layout from '@/layout';
import lazyLoad from '../lazyLoad';

const testRouter = [
  {
    element: <Layout />,
    children: [
      {
        path: '/test',
        element: (
          <>
            <Outlet />
          </>
        ),
        meta: { title: '测试react19' },
        children: [
          {
            path: '/test/testRef',
            meta: { title: 'testRef' },
            element: lazyLoad(lazy(() => import('@/views/Test/TestRef')))
          },
          {
            path: '/test/testUse',
            meta: { title: 'testUse' },
            element: lazyLoad(lazy(() => import('@/views/Test/TestUse')))
          },
          {
            path: '/test/testRSC',
            meta: { title: 'testRSC' },
            element: lazyLoad(lazy(() => import('@/views/Test/TestRSC')))
          },
          {
            path: '/test/testMeta',
            meta: { title: 'testMeta' },
            element: lazyLoad(lazy(() => import('@/views/Test/TestMeta')))
          }
        ]
      }
    ]
  }
];

export default testRouter;
