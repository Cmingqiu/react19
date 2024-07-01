import { Button, Checkbox, Form, Input } from 'antd';
import style from './index.module.scss';

export default function Login() {
  async function login(formData) {
    // const res = await fetch('http://localhost:3000/login', formData);
    // const data = await res.json();
    console.log(data);
  }

  return (
    <div className={style.loginForm}>
      <h2>登录</h2>
      <Form
        name='form'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={login}>
        <Form.Item
          label='用户名'
          name='username'
          rules={[{ required: true, message: '请输入用户名' }]}>
          <Input />
        </Form.Item>
        <Form.Item name='password' label='密码'>
          <Input.Password />
        </Form.Item>
        <Button type='primary' htmlType='submit'>
          登录
        </Button>
      </Form>
    </div>
  );
}
