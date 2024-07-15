import { useImperativeHandle } from 'react';

export default function Child({ ref }) {
  const clear = () => {
    ipt.value = '';
  };
  useImperativeHandle(ref, () => ({
    clear
  }));
  return (
    <>
      <h1>Child</h1>
      <input id='ipt' type='text' ref={ref} />
    </>
  );
}
