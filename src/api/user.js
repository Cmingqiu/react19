import http from '.';

// 用户的crud操作
/**
 * @param {*} body
 * @param {string} name
 * @param {string} password
 * @param {number} age
 * @param {string[]} roles
 */
export function apiAddUser(body) {
  return http({
    url: '/user',
    method: 'POST',
    body
  });
}

/**
 *查询所有/指定用户
 */
export function apiGetUser(id) {
  return http({ url: `/user${id !== undefined ? `/${id}` : ''}` });
}

export function apiUpdateUser(body) {
  return http({ url: `/user/${body.id}`, body, method: 'PATCH' });
}

export function apiDeleteUser(id) {
  return http({ url: `/user/${id}`, method: 'DELETE' });
}
