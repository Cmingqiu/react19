import TestRef from './components/TestRef';
import TestUse from './components/TestUse';
import TestRSC from './components/TestRSC';
import TestMeta from './components/TestMeta';
import Login from '@/views/Login';
import List from '@/views/List';

import useAntdPop from '@/hooks/useAntdPop';
import { useState } from 'react';

export default function App() {
  useAntdPop();
  const [token] = useState(localStorage.getItem('access_token'));
  return (
    <>
      <h1>react 19</h1>
      {/* <TestRef /> */}
      {/* <TestUse /> */}
      {/* <TestRSC /> */}
      {/* <TestMeta /> */}

      <Login />
      <List />
    </>
  );
}
