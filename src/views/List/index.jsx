import { apiGetList } from '@/api/list';
import { useEffect } from 'react';

export default function List() {
  useEffect(() => {
    apiGetList({ page: 1 });
  }, []);
  return (
    <>
      <h1>列表页</h1>
    </>
  );
}
