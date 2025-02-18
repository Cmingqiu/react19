import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

const Child = () => {
  console.log('render -child ', new Date().toLocaleString()); //组件会更新3次
  return <div>child</div>;
};

export default function TestMeta() {
  const [text, setText] = useState(0);
  const [time, setTime] = useState(new Date().toLocaleString());

  console.log('render', new Date().toLocaleString()); //组件会更新3次
  useEffect(() => {
    setTimeout(() => {
      //   flushSync(() => {
      setText(1); // 再次设置组件状态，最多会再更新1次组件，尽管状态没有变化。
      //   });
    }, 1000);
    console.log('effect');
  }, [text]);

  let changeVal = text + '__' + new Date().toLocaleString();

  return (
    <>
      <h2 onClick={() => setText(2)}>TestMeta - {changeVal}</h2>
      <title>TestMeta- title</title>
      <meta name='description' content='xxxx' />
      <br />
      <Child />
    </>
  );
}
