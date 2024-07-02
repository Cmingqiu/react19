import http from '.';

// 登入操作
export function apiLogin(body) {
  return http({
    url: '/login',
    method: 'POST',
    body
  })
    .then(res => {
      console.log('2222 ', res);
      return res.json();
    })
    .catch(err => {
      console.error('xxx', err);
    });
}

// 获取验证码
export function apiGetCaptcha() {
  return http({ url: '/login/captcha' }).then(res => res.blob());
}
