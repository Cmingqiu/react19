import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';

import notFoundImg from '@/images/404.svg';

export default function NOT_FOUND() {
  const navigate = useNavigate();
  function goHome() {
    navigate('/');
  }
  return (
    <NOT_FOUND_WRAP>
      <img src={notFoundImg} alt='' srcSet='' />
      <Button type='link' onClick={goHome}>
        网页不翼而飞 先回首页吧~
      </Button>
    </NOT_FOUND_WRAP>
  );
}

const NOT_FOUND_WRAP = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 400px;
    height: 300px;
  }
`;
