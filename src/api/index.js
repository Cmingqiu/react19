import { message } from '@/hooks/useAntdPop';
import { router } from '@/router';

const RESPONSE_FUNCS = {
  json: ['json'], // 'application/json'
  blob: ['image', 'xls', 'doc'] // 'image/svg+xml; charset=utf-8'
};

export default function http(options) {
  const _params = dealParams(options);
  const { url, ...params } = _params;
  let response, responseType;

  return new Promise(function (resolve, reject) {
    fetch(url, params)
      .then(res => {
        response = res;
        const { status, headers } = res;
        const contentType = headers.get('Content-Type') || '';

        const [isInvalidate, errorText] = validateStatus(status);
        if (isInvalidate) {
          localStorage.removeItem('access_token');
          message.error(errorText);
          throw { status }; //new Error(status);
        }

        responseType = findResponseTypeByContentType(contentType);
        if (responseType) {
          return res[responseType]();
        } else {
          throw {
            status: 200,
            statusText: new Error(`未找到【${contentType}】的处理函数，请完善`)
          };
        }
      })
      .then(res => {
        if (responseType === 'json') {
          const { code, msg, data } = res;
          const isError = catchCustomErrorCode(code, msg);
          !isError && resolve(data);
          throw { ...res, status: 200 }; //new Error(JSON.stringify(res));
        }
        resolve(res);
      })
      .catch(reject); // {status, statusText, code, msg, data }
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
      'Access-Token': localStorage.getItem('access_token') || ''
    },
    credentials: 'include'
  };
  const params = {
    ...defaultConfig,
    ...options,
    url: `${import.meta.env.VITE_BASEURL}${options.url}`
  };

  // 格式化get请求的数据(fetch的get请求需要将参数拼接到url后面)
  if (params.method.toLowerCase() === 'get' && params.body !== undefined) {
    params.url += getFetch(params.body);
    delete params.body;
  }

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

/**
 * 处理异常状态码
 * @param {*} code
 */
function validateStatus(code) {
  let valid = false,
    errMessage = '未知错误';
  switch (code) {
    case 200:
      valid = true;
      break;
    case 400:
      errMessage = '错误的请求';
      break;
    case 401:
      router.navigate('/login');
      errMessage = '未授权，请重新登录';
      break;
    case 403:
      errMessage = '拒绝访问';
      break;
    case 404:
      errMessage = '请求错误,未找到该资源';
      break;
    case 405:
      errMessage = '请求方法未允许';
      break;
    case 408:
      errMessage = '请求超时';
      break;
    case 500:
      errMessage = '服务器端出错';
      break;
    case 501:
      errMessage = '网络未实现';
      break;
    case 502:
      errMessage = '网络错误';
      break;
    case 503:
      errMessage = '服务不可用';
      break;
    case 504:
      errMessage = '网络超时';
      break;
    case 505:
      errMessage = 'http版本不支持该请求';
      break;
    default:
      errMessage = `其他连接错误 --${code}`;
  }
  return [!valid, errMessage];
}

/**
 * 根据contentType查找相应的responseType。
 * @param {string} contentType - 要查找的内容类型。
 * @returns {string|undefined} - 匹配的函数键，如果没有找到则为undefined。
 */
function findResponseTypeByContentType(contentType) {
  const result = Object.entries(RESPONSE_FUNCS).find(([key, types]) =>
    types.some(type => contentType.includes(type))
  );
  return result?.[0] ?? undefined;
}
