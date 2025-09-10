import Login from '@/views/Login';
import NOT_FOUND from '@/views/NOT_FOUND';
import Layout from '@/layout';
import Dashboard from '@/views/dashboard';

export const routeArray = [];
// 导入所有业务路由
const matchRoutes = import.meta.glob('./modules/*.jsx', { eager: true });
Object.entries(matchRoutes).forEach(([path, module]) => {
  routeArray.push(...module.default);
});
// 根据order升序
routeArray.sort((a, b) => a.order - b.order);

const dashboard = {
  //  path: '',
  element: <Dashboard />,
  meta: { title: 'Dashboard', requiresAuth: false }
};

export const staticMenus = [
  {
    path: '/',
    ...dashboard
  }
];

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: staticMenus
  },
  {
    path: '/dashboard',
    element: <Layout />,
    children: [dashboard]
  },
  {
    path: '/login',
    element: <Login />,
    meta: { title: '登录', requiresAuth: false }
  },
  // ...routeArray,
  { path: '*', element: <NOT_FOUND />, meta: { title: '404' } },
  {
    element: <Layout />,
    children: []
  }
];
