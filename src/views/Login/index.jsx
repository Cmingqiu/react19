import { Button, Checkbox, Form, Input, message } from 'antd';
import style from './index.module.scss';
import { apiLogin, apiGetCaptcha } from '@/api/login';
import { useEffect, useState } from 'react';

export default function Login() {
  const [captchaImg, setCaptchaImg] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  // 登录
  async function login(formData) {
    const [code, msg] = await apiLogin(formData);
    code === 0 && messageApi.success(msg);
  }

  // 请求验证码
  async function getCaptcha() {
    const blob = await apiGetCaptcha();
    const url = URL.createObjectURL(blob);
    setCaptchaImg(url);

    /*  const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      setCaptchaImg(reader.result);
    }; */
  }

  useEffect(() => {
    getCaptcha();
  }, []);

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
        <Form.Item name='code'>
          <div className='captcha-row'>
            <Input />
            <img className={style.captchaImg} src={captchaImg} alt='' />
          </div>
        </Form.Item>
        <Button type='primary' htmlType='submit'>
          登录
        </Button>
      </Form>
    </div>
  );
}
