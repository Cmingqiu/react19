import { Button, Checkbox, Form, Input } from 'antd';
import style from './index.module.css';

export default function Login() {
  function login() {}
  return (
    <div className={style.loginForm}>
      <h2>登录</h2>
      <Form name='form'>
        <Form.Item label='用户名' name='username'>
          <Input />
        </Form.Item>
        <Form.Item name='password' label='密码'>
          <Input.Password />
        </Form.Item>
        <Button type='primary' onClick={login}>
          登录
        </Button>
      </Form>
    </div>
  );
}
