import { Button } from 'antd';
import styled from 'styled-components';
import { router } from '@/router';
import { TOKEN_NAME } from '@/utils/const';

export default function LayoutHeader() {
  function loginOut() {
    localStorage.removeItem(TOKEN_NAME);
    router.navigate('/login');
  }
  return (
    <HeaderWrap>
      <Button type='link' onClick={loginOut}>
        登出
      </Button>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.header`
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
`;
