import styled from 'styled-components';
import LayoutSide from './part/LayoutSide';
import LayoutHeader from './part/LayoutHeader';

export default function Layout() {
  return (
    <LayoutWrap>
      <LayoutSide />
      <LayoutHeader />
      <Outlet />
    </LayoutWrap>
  );
}

const LayoutWrap = styled.div`

`;
