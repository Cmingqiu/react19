import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import LayoutSide from './part/LayoutSide';
import LayoutHeader from './part/LayoutHeader';
import LayoutContent from './part/LayoutContent';

export default function Layout() {
  return (
    <LayoutWrap>
      {/* 侧边栏 */}
      <LayoutSide />
      <div className='app-right'>
        {/* 头部 */}
        <LayoutHeader />
        <LayoutContent>
          <Outlet />
        </LayoutContent>
      </div>
    </LayoutWrap>
  );
}

const LayoutWrap = styled.div`
  height: 100vh;
  box-sizing: border-box;
  .app-right {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
`;
