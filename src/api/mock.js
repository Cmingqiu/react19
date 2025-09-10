import { mockFetch } from '@/utils';

const userRoute = [
  {
    order: 2,
    path: '/user-list',
    element: '/views/user-list/index.jsx',
    meta: { title: '用户列表页', requiresAuth: true }
  }
];
const adminRouter = [
  /* {
    order: 1,
    path: '/home',
    meta: { title: '首页', requiresAuth: false },
    children: [
      {
        path: 'about',
        element: '/home/about',
        meta: { title: '关于', requiresAuth: true },
        children: [
          {
            path: 'about1',
            element: '/home/about/about1',
            meta: { title: '关于1', requiresAuth: true }
          }
        ]
      }
    ]
  }, */
  {
    order: 3,
    path: '/test',
    meta: { title: '测试react19' },
    element: '',
    children: [
      {
        path: 'testRef',
        element: '/views/test/testRef.jsx',
        meta: { title: 'testRef' }
      },
      {
        path: 'testUse',
        element: '/views/test/testUse.jsx',
        meta: { title: 'testUse' }
      },
      {
        path: 'testRSC',
        element: '/views/test/testRSC.jsx',
        meta: { title: 'testRSC' }
      },
      {
        path: 'testMeta', // 已经在LayoutSide判断了，可带父路径，也可以不带
        element: '/views/test/testMeta.jsx',
        meta: { title: 'testMeta' }
      },
      {
        path: 'testFlushSync', // 路由表可以省略父路径
        element: '/views/test/testFlushSync.jsx',
        meta: { title: 'testFlushSync' } // title必有，用作菜单
      },
      {
        path: 'testProvider',
        element: '/views/test/testProvider.jsx',
        meta: { title: 'testProvider' }
      }
    ]
  },
  ...userRoute
];

export const fetchMenus = type => {
  const menus = type === 'admin' ? adminRouter : userRoute;
  menus.sort((a, b) => a.order - b.order);
  return mockFetch(menus);
};
