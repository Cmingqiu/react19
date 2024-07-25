import { useEffect, useState } from 'react';

import { Button, Table, Modal } from 'antd';

import { apiGetUser } from '@/api/user';
import UserModal from './userModal';
import styled from 'styled-components';
import useUserModal from './hooks/useUserModal';

export default function UserList() {
  const [list, setList] = useState('');
  const { modal, setModal, modalRef, ok, onCancel } = useUserModal(getUsers);
  const columns = [
    { title: '姓名', dataIndex: 'name' },
    { title: '年龄', dataIndex: 'age' },
    { title: '角色', dataIndex: 'roles' }
  ];

  async function getUsers(id) {
    try {
      const users = await apiGetUser(id);
      setList(users.map(user => ({ ...user, key: user._id })));
    } catch (error) {}
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <UserListWrap>
      <h1>用户列表页</h1>
      <div className='row'>
        <Button onClick={() => setModal({ modalType: 1, modalShow: true })}>
          新增用户
        </Button>

        <Button type='primary' onClick={() => getUsers()}>
          查询
        </Button>
      </div>
      <Table dataSource={list} columns={columns} />

      <Modal
        title={`${modal.modalType === 1 ? '新增' : '编辑'}用户`}
        open={modal.modalShow}
        onOk={ok}
        onCancel={onCancel}>
        <UserModal ref={modalRef} />
      </Modal>
    </UserListWrap>
  );
}

const UserListWrap = styled.div`
  height: 100%;
  .row {
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    button + button {
      margin-left: 10px;
    }
  }
  .ant-table-wrapper {
    height: calc(100% - 100px);
  }
`;
