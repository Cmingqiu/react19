import { useState } from 'react';
import { flushSync } from 'react-dom';

export default function TestFlushSync() {
  console.log('start App render');
  let syncUpdatedCount;
  const [count, setCount] = useState(0);

  return (
    <div>
      <button
        onClick={() => {
          flushSync(() => {
            setCount(c => {
              syncUpdatedCount = c + 1;
              return syncUpdatedCount;
            });
          });
          console.log('count1: ', syncUpdatedCount);
          flushSync(() => {
            setCount(c => {
              syncUpdatedCount = c + 2;
              return syncUpdatedCount;
            });
          });
          console.log('count2: ', syncUpdatedCount);
        }}>
        {count}
      </button>
    </div>
  );
}
