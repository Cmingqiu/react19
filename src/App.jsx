import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';

import useAntdPop from '@/hooks/useAntdPop';
import { router } from './router';
import AuthRouter from './router/AuthRouter';
import styled, { createGlobalStyle } from 'styled-components';
import { fetchMenus } from './api/mock';
import { TOKEN_NAME } from '@/utils/const';
import { useMenuStore } from '@/store/useMenuStore';
import { handleRoute } from '@/utils';

export default function App() {
  useAntdPop();
  const menus = useMenuStore(store => store.menus);
  const setMenus = useMenuStore(store => store.setMenus);
  const [isLoading, setLoading] = useState(false);
  console.log('app  ');

  useEffect(() => {
    //todo: 静态路由不需要查询，比如/login /404 /dashboard

    if (!menus || menus.length === 0) {
      setLoading(true);
      fetchMenus(localStorage.getItem(TOKEN_NAME))
        .then(res => {
          setMenus(res);
          const newRoues = handleRoute([...res]);
          console.log('fetchMenus: ', res, newRoues);
          router.routes.at(-1).children = newRoues;
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [menus]);

  if (isLoading) return '加载中...';

  return (
    // AuthRouter组件只会在初始化执行一次
    <AuthRouter>
      <GlobalStyle />
      <RouterProvider router={router}>哈哈哈哈哈 这里不展示</RouterProvider>
    </AuthRouter>
  );
}

const GlobalStyle = createGlobalStyle` 
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html,body,#root{
    height: 100%;
  }
/* 滚动条样式 */
  ::-webkit-scrollbar{
      display: none;
      /* width:8px;
      height:8px;
      &-track{
        background: rgb(239, 239, 239);
        border-radius:2px;
      } 
      &-thumb{
        background: #bfbfbf;
        border-radius:10px;
        &:hover{
          background: #333;
        }
      }
      &-corner{
        background: #179a16;
      } */
    }
`;
