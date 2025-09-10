import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Menu } from 'antd';

import { routeArray } from '@/router/routers';
import logoImg from '@/images/react.png';
import { useMenuStore } from '@/store/useMenuStore';
import { staticMenus } from '@/router/routers';

const Logo = () => {
  return (
    <LogoWrap>
      <img src={logoImg} alt='' srcSet='' />
    </LogoWrap>
  );
};

export default function LayoutSide() {
  // 组装左侧菜单项
  const menuList = [];
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const menus = useMenuStore(state => state.menus);
  setMenuList([...staticMenus, ...menus], menuList);
  console.log('menuList: ', menuList);
  function setMenuList(routes, menuList, parentPath = '') {
    routes.forEach(route => {
      const { path, meta = {}, children = [] } = route;
      if (path) {
        // 有path属性，则是业务组件非Layout组件
        const { title, icon } = meta;
        const menu = {
          key:
            !parentPath || path.includes(parentPath)
              ? path
              : parentPath + '/' + path,
          label: title,
          icon
        };
        menuList.push(menu);
        if (children.length)
          setMenuList(children, menu.children || (menu.children = []), path);
      } else {
        setMenuList(children, menuList, '');
      }
    });
  }

  const clickMenu = ({ key }) => {
    navigate(key);
  };
  return (
    <>
      <SiderWrap>
        <Logo />
        <Menu
          className='aside-menu'
          mode='inline'
          theme='dark'
          selectedKeys={[pathname]}
          items={menuList}
          onClick={clickMenu}
        />
      </SiderWrap>
    </>
  );
}

const SiderWrap = styled.aside`
  width: 230px;
  background-color: #001529;
  height: 100%;
  float: left;
  .aside-menu {
    height: calc(100% - 100px);
    overflow-y: scroll;
  }
`;

const LogoWrap = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    height: 80%;
  }
`;
