// ////////////////////
// 'use server';

import { useEffect, useState } from 'react';

export default function TestRSC() {
  const [count, setCount] = useState(0);
  console.log('render', count, new Date().toLocaleString());
  useEffect(() => {
    console.log('mount', new Date().toLocaleString());
    setTimeout(() => {
      // setCount(10);
    }, 1000);
  }, []);

  useEffect(() => {
    // setCount(count => count + 1);
    console.log('count change', new Date().toLocaleString());
  }, [count]);

  function change() {
    setCount(count + 1);
  }

  return (
    <div>
      <h2>TestSrc</h2>
      <div>{count}</div>
      <button type='button' onClick={change}>
        change
      </button>
    </div>
  );
}
