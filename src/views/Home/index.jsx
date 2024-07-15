import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

export default function Home() {
  return (
    <HomeWrap>
      <h1>Home</h1>
      <Outlet />
    </HomeWrap>
  );
}

const HomeWrap = styled.div``;
