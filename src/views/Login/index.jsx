import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import styled from 'styled-components';

import { apiLogin, apiGetCaptcha } from '@/api/login';
import { message } from '@/hooks/useAntdPop';
import { TOKEN_NAME } from '@/utils/const';

export default function Login() {
  const [captchaImg, setCaptchaImg] = useState('');
  const navigate = useNavigate();

  // 登录
  async function login(formData) {
    try {
      const token = await apiLogin(formData);
      localStorage.setItem(TOKEN_NAME, token);
      message.success('登录成功');
      navigate('/list');
    } catch (error) {
      console.log(11, error);
      if (code === -1001) {
        //验证码错误
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
    <LoginForm>
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
            <Input name='code' />
            <img
              className='captcha-img'
              src={captchaImg}
              alt=''
              onClick={getCaptcha}
            />
          </div>
        </Form.Item>
        <Button type='primary' htmlType='submit'>
          登录
        </Button>
      </Form>
    </LoginForm>
  );
}

const LoginForm = styled.div`
  width: 500px;
  padding: 10px;
  .captcha-row {
    width: 500px;
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
