import TestRef from './components/TestRef';
import TestUse from './components/TestUse';
import TestRSC from './components/TestRSC';
import TestMeta from './components/TestMeta';
import Login from '@/views/Login';
import useAntdPop from '@/hooks/useAntdPop';

export default function App() {
  useAntdPop();
  return (
    <>
      <h1>react 19</h1>
      {/* <TestRef /> */}
      {/* <TestUse /> */}
      {/* <TestRSC /> */}
      {/* <TestMeta /> */}

      <Login />
    </>
  );
}
