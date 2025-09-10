import { lazy } from 'react';
import lazyLoad from '@/router/lazyLoad';
import Layout from '@/layout';
import { Outlet } from 'react-router-dom';

const modules = import.meta.glob('../views/**/*.jsx');
console.log('modules:', modules);
export const mockFetch = data => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};

/**
 * 处理路由，将菜单数据转成路由
 * @param {Array} data - 菜单数据
 * @param {String} parentPath - 父级路径
 */
export const handleRoute = (data, level = 1, parentPath = '') => {
  if (!Array.isArray(data) || data.length === 0) return data;

  for (let item of data) {
    const { path, children, element } = item;
    item.level = level;
    // console.log(path, `..${element}`, level);
    // 拼接完整路径
    const fullPath = /* parentPath ? `${parentPath}/${path}` : */ path;
    // 安全检查：确保path存在且为字符串
    if (typeof fullPath === 'string' && fullPath) {
      // 简单的路径安全检查，防止非法字符
      const safePath = fullPath.replace(/[^a-zA-Z0-9/_-]/g, '');
      if (!element) {
        item.element = <Outlet />;
      } else {
        item.element = lazyLoad(lazy(modules[`..${element}`]));
      }
    }
    // 递归处理子路由并传递父路径
    if (children && Array.isArray(children) && children.length > 0) {
      handleRoute(children, level + 1, fullPath);
    }
  }
  return data;
};
