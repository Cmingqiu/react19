import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

import Layout from '@/layout';
import lazyLoad from '../lazyLoad';

const testRouter = [
  {
    order: 3,
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
            path: 'testRef',
            meta: { title: 'testRef' },
            element: lazyLoad(lazy(() => import('@/views/test/testRef')))
          },
          {
            path: 'testUse',
            meta: { title: 'testUse' },
            element: lazyLoad(lazy(() => import('@/views/test/testUse')))
          },
          {
            path: 'testRSC',
            meta: { title: 'testRSC' },
            element: lazyLoad(lazy(() => import('@/views/test/testRSC')))
          },
          {
            path: 'testMeta', // 已经在LayoutSide判断了，可带父路径，也可以不带
            meta: { title: 'testMeta' },
            element: lazyLoad(lazy(() => import('@/views/test/testMeta')))
          },
          {
            path: 'testFlushSync', // 路由表可以省略父路径
            meta: { title: 'testFlushSync' }, // title必有，用作菜单
            element: lazyLoad(lazy(() => import('@/views/test/testFlushSync')))
          },
          {
            path: 'testProvider',
            meta: { title: 'testProvider' },
            element: lazyLoad(lazy(() => import('@/views/test/testProvider')))
          }
        ]
      }
    ]
  }
];

export default testRouter;
