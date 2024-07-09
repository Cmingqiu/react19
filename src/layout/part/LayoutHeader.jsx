import { Button } from 'antd';
import styled from 'styled-components';

export default function LayoutHeader() {
  return (
    <HeaderWrap>
      <Button type='link'>登出</Button>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.header`
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
`;
