import { createMessage } from 'antd';

const message = createMessage({});

export default function http(options) {
  const defaultConfig = {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
    credentials: 'include'
  };

  const params = { ...defaultConfig, ...options };
  params.method.toLowerCase() === 'post' &&
    (params.body = JSON.stringify(params.body));

  return new Promise(function (resolve, reject) {
    fetch(`${import.meta.env.VITE_BASEURL}/${params.url}`, params)
      .then(res => {
        if (res.headers.contentType.includes('application/json')) {
          return res.json();
        }
      })
      .then(data => {
        resolve(data);
      })
      .catch(reject);
  });
}
