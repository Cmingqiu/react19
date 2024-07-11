import http from '.';

// 查询用户
export function apiGetUser(body) {
  const { id } = body;
  return http({
    url: `/user${id ? `/${id}` : ''}`,
    method: 'get',
    body
  });
}
