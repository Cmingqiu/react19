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
        const { status, statusText, headers } = res;
        const contentType = headers.contentType;

        if (status !== 200) {
          return;
        }

        if (contentType.includes('json')) {
          return res.json();
        } else if (contentType.includes('json')) {
          return res.blob();
        }
      })
      .then(data => {
        resolve(data);
      })
      .catch(reject);
  });
}
