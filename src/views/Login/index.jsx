import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import styled from 'styled-components';

import { apiLogin, apiGetCaptcha } from '@/api/login';
import { message } from '@/hooks/useAntdPop';
import { TOKEN_NAME } from '@/utils/const';
import { mockFetch } from '@/utils';
import logoImg from '@/images/react.png';

export default function Login() {
  const [captchaImg, setCaptchaImg] = useState('');
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // 登录
  async function login(formData) {
    try {
      const token = await mockFetch(formData.username);
      // const token = await apiLogin(formData);
      localStorage.setItem(TOKEN_NAME, token);
      message.success('登录成功');
      navigate('/');
    } catch (error) {
      if (error.code !== 0) {
        //验证码错误
        form.setFieldsValue({ code: '' }); // TODO
        getCaptcha();
      }
    }
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
    <LoginPage>
      <img className='logo' src={logoImg} alt='' srcSet='' />
      <Form
        name='loginForm'
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        size='large'
        onFinish={login}>
        <Form.Item
          label='用户名'
          name='username'
          rules={[{ required: true, message: '请输入用户名' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='password'
          label='密码'
          rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item name='code' wrapperCol={24}>
          <div className='captcha-row'>
            <Input name='code' />
            <img
              className='captcha-img'
              src={captchaImg}
              alt=''
              onClick={getCaptcha}
            />
          </div>
        </Form.Item>
        <Form.Item wrapperCol={24} className='captcha-row'>
          <Button type='primary' htmlType='submit'>
            登录
          </Button>
        </Form.Item>
      </Form>
    </LoginPage>
  );
}

const LoginPage = styled.div`
  height: 100vh;
  padding: 10px;
  background-color: aliceblue;
  .logo {
    width: 100px;
  }
  form {
    width: 400px;
    position: fixed;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
    padding: 35px 20px 10px;
    border-radius: 8px;
    box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.5);
    box-sizing: content-box;
  }
  .captcha-row {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    input {
      width: 120px;
    }

    .captcha-img {
      width: 100px;
      height: 34px;
      cursor: pointer;
      margin-left: 10px;
    }
  }
`;
