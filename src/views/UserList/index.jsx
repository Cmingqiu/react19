import { useEffect, useState } from 'react';

import { apiGetUser } from '@/api/list';
import { Button } from 'antd';

export default function UserList() {
  const [list, setList] = useState('');

  function getUsers(id) {
    return async () => {
      try {
        const token = await apiGetUser({ page: 1, id });
        setList(token);
      } catch (error) {}
    };
  }

  useEffect(() => {}, []);

  return (
    <>
      <h1>用户列表页</h1>
      {list}
      <Button onClick={getUsers()}>查询所有用户</Button>
      <Button onClick={getUsers(100)}>查询指定用户</Button>
    </>
  );
}
