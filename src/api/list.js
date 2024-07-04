import http from '.';

// 查询列表
export function apiGetList(body) {
  return http({
    url: '/user',
    method: 'get',
    body
  });
}
