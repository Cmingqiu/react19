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

export default function App() {
  useAntdPop();
  return (
    <RouterProvider router={router}>
      哈哈哈哈哈
      {/* <TestRef /> */}
      {/* <TestUse /> */}
      {/* <TestRSC /> */}
      {/* <TestMeta /> */}
    </RouterProvider>
  );
}
