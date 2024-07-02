import http from '.';

// 登入操作
export function apiLogin(body) {
  return http({
    url: '/login',
    method: 'POST',
    body
  });
}

// 获取验证码
export function apiGetCaptcha() {
  return http({ url: '/login/captcha' });
}
