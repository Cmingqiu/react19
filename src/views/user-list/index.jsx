import { Fragment, useCallback, useEffect, useRef, useState } from 'react';

import { Button, Table, Modal, Popconfirm, Tag } from 'antd';
import styled from 'styled-components';

import { apiGetUser } from '@/api/user';
import useUserModal from './hooks/useUserModal';
import UserModal from './userModal';
import UserSearchForm, { rolesOptions } from './UserSearchForm';

export default function UserList() {
  const [list, setList] = useState('');
  const currentRow = useRef(); // 当前操作的行数据
  const searchForm = useRef(null); // 筛选条件表单
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
    {
      title: '角色',
      dataIndex: 'roles',
      render(_, record) {
        return record.roles.map((role, idx) => {
          const roleOpt = rolesOptions.find(opt => opt.value === role);
          if (roleOpt) {
            return (
              <Fragment key={idx}>
                <Tag color={roleOpt.color}> {roleOpt.label}</Tag>
              </Fragment>
            );
          }
        });
      }
    },
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

  // 搜索
  const search = useCallback(() => {
    const formData = searchForm.current.form.getFieldsValue();
    Object.keys(formData).forEach(key => {
      !formData[key] && delete formData[key];
    });
    console.log(formData);
    getUsers(formData);
  });

  async function getUsers(id) {
    try {
      const users = await apiGetUser(id);
      setList(users.map(user => ({ ...user, key: user._id })));
    } catch (error) {}
  }

  useEffect(() => {
    search();
  }, []);

  return (
    <UserListWrap>
      <h1>用户列表页</h1>
      <div className='row'>
        <UserSearchForm search={search} ref={searchForm} />

        <div>
          <Button onClick={() => setModal({ modalType: 1, modalShow: true })}>
            新增用户
          </Button>
          <Button type='primary' onClick={search}>
            查询
          </Button>
        </div>
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
    justify-content: space-between;
    button + button {
      margin-left: 10px;
    }
  }
  .ant-table-wrapper {
    height: calc(100% - 100px);
  }
`;
