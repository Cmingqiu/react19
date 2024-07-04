import { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

import style from './index.module.scss';
import { apiLogin, apiGetCaptcha } from '@/api/login';
import { message } from '@/hooks/useAntdPop';

export default function Login() {
  const [captchaImg, setCaptchaImg] = useState('');

  // 登录
  async function login(formData) {
    try {
      const token = await apiLogin(formData);
      localStorage.setItem('access_token', token);
      message.success('登录成功');
    } catch (error) {}
  }

  // 请求验证码
  async function getCaptcha() {
    const blob = await apiGetCaptcha();
    const url = URL.createObjectURL(blob);
    setCaptchaImg(url);

    /* 方式二
      const reader = new FileReader();
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
