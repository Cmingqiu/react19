import { forwardRef, useImperativeHandle } from 'react';

import { Input, Form, Select } from 'antd';
import styled from 'styled-components';

export const rolesOptions = [
  { label: '超级管理员', value: 'super-admin', color: '#f50' },
  { label: '管理员', value: 'admin', color: '#2db7f5' },
  { label: '成员', value: 'member', color: '#108ee9' }
];

const UserSearchForm = forwardRef(({ search }, ref) => {
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({ form }));

  return (
    <FormWrap>
      <Form form={form} layout='inline'>
        <Form.Item label='用户名' name='name'>
          <Input allowClear />
        </Form.Item>

        <Form.Item label='角色' name='roles'>
          <Select
            className='role-select'
            mode='multiple'
            options={rolesOptions}
            onChange={search}
            allowClear
          />
        </Form.Item>
      </Form>
    </FormWrap>
  );
});

export default UserSearchForm;

const FormWrap = styled.div`
  .role-select {
    width: 120px;
  }
`;
