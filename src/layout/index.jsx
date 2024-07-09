import styled from 'styled-components';
import LayoutSide from './part/LayoutSide';

export default function Layout() {
  return (
    <LayoutWrap>
      <LayoutSide />
      <Outlet />
    </LayoutWrap>
  );
}

const LayoutWrap = styled.div``;
