import TestRef from './components/TestRef';
import TestUse from './components/TestUse';
import TestRSC from './components/TestRSC';
import TestMeta from './components/TestMeta';
import Login from '@/views/Login';
import List from '@/views/List';

import {} from 'react';
import { RouterProvider } from 'react-router-dom';

import useAntdPop from '@/hooks/useAntdPop';
import { router } from './router';
import AuthRouter from './router/AuthRouter';
import styled, { createGlobalStyle } from 'styled-components';

export default function App() {
  useAntdPop();
  return (
    <AuthRouter>
      <GlobalStyle />
      <RouterProvider router={router}>
        哈哈哈哈哈 这里不展示
        {/* <TestRef /> */}
        {/* <TestUse /> */}
        {/* <TestRSC /> */}
        {/* <TestMeta /> */}
      </RouterProvider>
    </AuthRouter>
  );
}

const GlobalStyle = createGlobalStyle` 
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
