import Login from '@/views/Login';
import NOT_FOUND from '@/views/NOT_FOUND';

export const routeArray = [];
// 导入所有业务路由
const matchRoutes = import.meta.glob('./modules/*.jsx', { eager: true });
Object.entries(matchRoutes).forEach(([path, module]) => {
  routeArray.push(...module.default);
});
// 根据order升序
routeArray.sort((a, b) => a.order - b.order);

export const routes = [
  {
    path: '/login',
    element: <Login />,
    meta: { title: '登录', requiresAuth: false }
  },
  ...routeArray,
  { path: '*', element: <NOT_FOUND />, meta: { title: '404' } }
];
