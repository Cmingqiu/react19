import { Button, Dropdown } from 'antd';
import styled from 'styled-components';

import { router } from '@/router';
import { TOKEN_NAME } from '@/utils/const';
import avatarImg from '@/images/avatar.png';

export default function LayoutHeader() {
  const items = [
    {
      key: 'logout',
      label: '登出'
    }
  ];
  const onClick = ({ key }) => {
    switch (key) {
      case 'logout':
        loginOut();

        break;

      default:
        break;
    }
  };

  function loginOut() {
    localStorage.removeItem(TOKEN_NAME);
    router.navigate('/login');
  }
  return (
    <HeaderWrap>
      <div></div>
      <Dropdown menu={{ items, onClick }} arrow>
        <img className='avatar' src={avatarImg} alt='' srcSet='' />
      </Dropdown>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.header`
  height: 50px;
  padding: 0 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .avatar {
    width: 30px;
    cursor: pointer;
  }
`;
