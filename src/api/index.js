import { message } from '@/hooks/useAntdPop';

export default function http(options) {
  const _params = dealParams(options);
  const { url, ...params } = _params;
  let response;

  return new Promise(function (resolve, reject) {
    fetch(url, params)
      .then(res => {
        response = res;
        const { status, statusText, headers } = res;
        const contentType = headers.get('Content-Type') || '';

        if (status !== 200) {
          return message.error(statusText || '网络异常');
        }

        if (contentType.includes('json')) {
          return res.json();
        } else if (contentType.includes('image')) {
          // 'image/svg+xml; charset=utf-8'
          return res.blob();
        }
      })
      .then(res => {
        const contentType = response.headers.get('Content-Type') || '';
        if (contentType.includes('json')) {
          const { code, msg, data } = res;
          const isError = catchCustomErrorCode(code, msg);
          !isError && resolve(data);
          throw new Error(JSON.stringify(res));
        }
        resolve(res);
      })
      .catch(reject);
  });
}

// 发送GET请求格式化参数
const getFetch = params => {
  const query = [];
  if (typeof params === 'object' && params) {
    Object.keys(params).forEach(val => {
      query.push(val + '=' + encodeURIComponent(params[val]));
    });
  }
  return '?' + query.join('&');
};

/**
 * 处理参数
 * @param {*} { url:'', method:'', body:{}, headers:{} ,credentials:'' }
 * @returns
 */
function dealParams(options) {
  const defaultConfig = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'Access-Token': localStorage.getItem('access_token')
    },
    credentials: 'include'
  };
  const params = {
    ...defaultConfig,
    ...options,
    url: `${import.meta.env.VITE_BASEURL}/${options.url}`
  };

  // 格式化get请求的数据(fetch的get请求需要将参数拼接到url后面)
  params.method === 'GET' &&
    params.body !== undefined &&
    (params.url += getFetch(params.body));

  // post请求序列化入参
  params.method.toLowerCase() === 'post' &&
    (params.body = JSON.stringify(params.body));

  return params;
}

function catchCustomErrorCode(code, msg) {
  let text = '';
  switch (code) {
    case 1001:
      text = '参数错误';
    case 1002:
      text = '用户未登录';
    case 1003:
      text = '用户无权限';
    case 1004:
      text = '资源不存在';
    case 1005:
      text = '服务端内部错误';
  }
  if (code !== 0) {
    message.error(text || msg);
    return true;
  }
  return false;
}
