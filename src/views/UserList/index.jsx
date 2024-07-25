import { useEffect, useRef, useState } from 'react';

import { Button, Table, Modal, Popconfirm } from 'antd';

import { apiGetUser } from '@/api/user';
import UserModal from './userModal';
import styled from 'styled-components';
import useUserModal from './hooks/useUserModal';

export default function UserList() {
  const [list, setList] = useState('');
  const currentRow = useRef(); // 当前操作的行数据
  const {
    modal,
    setModal,
    modalRef,
    ok,
    onCancel,
    afterOpenChange,
    editUser,
    deleteUser
  } = useUserModal(currentRow, getUsers);
  const columns = [
    { title: '姓名', dataIndex: 'name' },
    { title: '密码', dataIndex: 'password' },
    { title: '年龄', dataIndex: 'age' },
    { title: '角色', dataIndex: 'roles' },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      render: (_, record) => {
        return (
          <>
            <Button type='link' onClick={editUser(record)}>
              编辑
            </Button>
            <Popconfirm
              title='确定删除用户吗?'
              onConfirm={deleteUser(record)}
              okText='Yes'
              cancelText='No'>
              {' '}
              <Button type='link'>删除</Button>
            </Popconfirm>
          </>
        );
      }
    }
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
        onCancel={onCancel}
        afterOpenChange={afterOpenChange}>
        {modal.modalShow && (
          <UserModal
            ref={modalRef}
            row={currentRow.current}
            type={modal.modalType}
          />
        )}
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
