import { forwardRef, useImperativeHandle } from 'react';

import { Input, Form, Select } from 'antd';
import styled from 'styled-components';

export const rolesOptions = [
  { label: '超级管理员', value: 'super-admin' },
  { label: '管理员', value: 'admin' },
  { label: '成员', value: 'member' }
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
