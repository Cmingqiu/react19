import { Select, Form, Input } from 'antd';
import { forwardRef, useImperativeHandle } from 'react';
import { rolesOptions } from './UserSearchForm';

const UserModal = forwardRef(({ row, type }, ref) => {
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    form
  }));

  return (
    <>
      <Form
        name='userListForm'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        size='large'
        form={form}>
        <Form.Item
          label='用户名'
          name='name'
          rules={[{ required: true, message: '请输入用户名' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='password'
          label='密码'
          rules={[{ required: true, message: '请输入密码' }]}>
          <Input />
        </Form.Item>
        <Form.Item name='age' label='年龄'>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={24} name='roles' label='角色'>
          <Select options={rolesOptions} mode='multiple' allowClear />
        </Form.Item>
      </Form>
    </>
  );
});
export default UserModal;
