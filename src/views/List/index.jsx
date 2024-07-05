import { apiGetList } from '@/api/list';
import { useEffect } from 'react';

export default function List() {
  useEffect(() => {
    async function api() {
      try {
        const token = await apiGetList({ page: 1 });
        console.log(11, token);
      } catch (error) {
        console.log(22, error);
      }
    }
    api();
  }, []);
  return (
    <>
      <h1>列表页</h1>
    </>
  );
}
