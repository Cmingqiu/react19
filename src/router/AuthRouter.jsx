import { router } from '.';
import { routes } from './routers';
import { TOKEN_NAME } from '@/utils/const';

/* 路由守卫组件 */
export default function AuthRouter({ children }) {
  const basename = router.basename; // '/'
  const { pathname } = router.state.location; // useLocation(); <Navigate to='/login' replace />; 只能在路由组件中使用
  const matchedRouter = searchRoute(pathname, routes);
  document.title = matchedRouter?.meta?.title ?? '';
  // 无需鉴权
  if (!matchedRouter?.meta?.requiresAuth) return children;

  const token = localStorage.getItem(TOKEN_NAME);
  if (!token) {
    router.navigate('/login');
    location.reload(); // hack 解决路由刷新时，页面不显示的问题，因为没有return组件，Navigate不能使用
  } else return children;
  /* 从后端请求到的动态路由+静态路由，查找当前pathname是否在其中，不在其中则跳转到403页面 
	// * Dynamic Router(动态路由，根据后端返回的菜单数据生成的一维数组)
	const dynamicRouter = store.getState().auth.authRouter;
	// * Static Router(静态路由，必须配置首页地址，否则不能进首页获取菜单、按钮权限等数据)，获取数据的时候会loading，所有配置首页地址也没问题
	const staticRouter = [HOME_URL, "/403"];
	const routerList = dynamicRouter.concat(staticRouter);
	// * 如果访问的地址没有在路由表中重定向到403页面
	if (routerList.indexOf(pathname) == -1) return <Navigate to="/403" />;

  */
}

/** dfs
 * 根据路径查找路由 TODO
 */
function searchRouter(pathname, routes) {
  // pathname = pathname.replace(new RegExp(basename, ''), '');

  return findRouteByPath(routes);

  function findRouteByPath(routes) {
    let result = {};
    for (let route of routes) {
      const children = route.children || [];
      if (route.path === pathname) return route;
      if (children.length) {
        const res = findRouteByPath(children);
        Object.keys(res).length && (result = res);
      }
    }
    return result;
  }
}

// bfs查找路由
const searchRoute = (path, routes = []) => {
  const queue = [...routes];
  while (queue.length) {
    const route = queue.shift();
    if (route.path === path) return route;
    if (route.children) queue.push(...route.children);
  }
};
