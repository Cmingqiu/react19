import { useEffect, useState } from 'react';

import { apiGetList } from '@/api/list';

export default function List() {
  const [list, setList] = useState('');
  useEffect(() => {
    async function api() {
      try {
        const token = await apiGetList({ page: 1 });
        setList(token);
      } catch (error) {}
    }
    api();
  }, []);
  return (
    <>
      <h1>列表页</h1>
      {list}
    </>
  );
}
