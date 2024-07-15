import { Suspense, useContext, useRef, useState, use } from 'react';
import { TestCtx } from './context/index';

export default function TestUse() {
  const [color, setColor] = useState('red');
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success');
    }, 2000);
  });
  console.log('===== TestUse');
  return (
    <>
      <button
        onClick={() => {
          setColor('blue');
        }}>
        change
      </button>
      <Suspense fallback={<div>加载中...</div>}>
        {/* 19的新特性，无需TestCtx.Provider */}
        <TestCtx value={[color, setColor]}>
          <Child promise={promise} />
        </TestCtx>
      </Suspense>
    </>
  );
}

function Child({ promise }) {
  const p = use(promise); // success
  console.log('---- child');
  const [color, setColor] = use(TestCtx); //useContext(TestCtx);
  return (
    <>
      <h3>Child</h3>
      <span onClick={() => setColor(Math.random() * 10)}>{color}</span>
      {/* <input type='text' value={color} /> */}
    </>
  );
}
