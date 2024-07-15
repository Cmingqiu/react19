import {} from 'react';
import { RouterProvider } from 'react-router-dom';

import useAntdPop from '@/hooks/useAntdPop';
import { router } from './router';
import AuthRouter from './router/AuthRouter';
import styled, { createGlobalStyle } from 'styled-components';

export default function App() {
  useAntdPop();
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
`;
