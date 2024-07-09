import styled from 'styled-components';

export default function LayoutSide() {
  return (
    <SiderWrap>
      <Outlet />
    </SiderWrap>
  );
}

const SiderWrap = styled.div``;
