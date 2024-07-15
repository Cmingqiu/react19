import { useRef, useImperativeHandle } from 'react';

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
