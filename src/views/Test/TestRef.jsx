/* import { useRef, useImperativeHandle } from 'react';

export default function TestRef() {
  const iptRef = useRef();
  const getRef = () => {
    console.log(iptRef.current);
    iptRef.current.value = Math.random() * 10;
  };
  return (
    <>
      <Child ref={iptRef} />
      <button onClick={getRef}>获取ref</button>{' '}
    </>
  );
}

function Child({ ref }) {
  const a = 1;
  useImperativeHandle(ref, () => ({
    a
  }));
  return (
    <>
      <h1>Child</h1>
      <input type='text' ref={ref} />
    </>
  );
}
 */

import {
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect
} from 'react';

export default function TestRef() {
  const [show, setShow] = useState(true);
  const iptRef = useRef();
  const getRef = () => {
    console.log(iptRef.current);
    iptRef.current.value = Math.random() * 10;
  };
  const showHandler = () => {
    setShow(!show);
  };
  return (
    <>
      {show && <Child ref={iptRef} value={100} />}
      <br />
      <br />
      <button onClick={getRef}>获取ref</button>
      <br />
      <br />
      <button onClick={showHandler}>展示/隐藏</button>
    </>
  );
}

const Child = forwardRef(({ value }, ref) => {
  const [num, setNum] = useState(100);
  useImperativeHandle(ref, () => ({
    num
  }));

  function req() {
    setTimeout(() => {
      setNum(value + 1);
      console.log('设置num', num);
    }, 1000);
  }

  useEffect(() => {
    req();
    console.log('子组件即将初始化');
    return () => {
      console.log('子组件即将销毁1');
    };
  }, []);

  useEffect(() => {
    console.log('num变化了', num);
    return () => {
      console.log('子组件即将销毁2', num);
    };
  }, [num]);
  return (
    <>
      <h1>Child </h1>
      <input type='text' ref={ref} />
    </>
  );
});
