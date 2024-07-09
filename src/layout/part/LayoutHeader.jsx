import styled from 'styled-components';

export default function LayoutHeader() {
  return (
    <HeaderWrap>
      <Outlet />
    </HeaderWrap>
  );
}

const HeaderWrap = styled.div``;
