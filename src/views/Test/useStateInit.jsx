import { useEffect, useState } from 'react';

function apiFetchData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('success');
    }, 1000);
  });
}

export default function Child({ ref }) {
  const [promise, setPromise] = useState(fetchData);

  async function fetchData() {
    const res = await apiFetchData();
    // setMsg(res);
    return res;
  }

  /*  useEffect(() => {
    fetchData();
  }, []); */

  const clear = () => {
    ipt.value = '';
  };

  return (
    <>
      <h2>useStateInit</h2>
      <input
        id='ipt'
        type='text'
        ref={ref}
        value={msg}
        onInput={e => setMsg(e.target.value)}
      />
    </>
  );
}
