import { Button, Checkbox, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useState, startTransition } from 'react';
import '../App.css';
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    // 提交表单且数据验证成功后回调事件
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        // Make an HTTP POST request to the backend
        axios.post(`${apiUrl}/user/login`, values)
        .then((response) => {
            // Check the response code
            if (response.data.code === 1) {
                // Login successful!
                console.log('Login successful!', response.data);

                    // Save the user info to localStorage
                    localStorage.setItem('user', JSON.stringify(response.data.data));

                    navigate("/map");

                    // Refresh the page to update the authentication status
                    window.location.reload();

                } else {
                    // Login failed
                    console.error('Login failed:', response.data.msg);
                    message.error('Invalid username or password. Please try again.');
                }
            })
            .catch((error) => {
                // Handle network or other errors
                console.error('Login failed:', error);
                message.error('Login failed. Please try again later.');
            });
    };

    const handleRegisterClick = () => {
        startTransition(() => {
            navigate('/register');
        });
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <h3 className='login_title'>
                Account Log In
            </h3>
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
            </Form.Item>

            <Form.Item>
                <Button block type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                <br />
                Or
                <a onClick={handleRegisterClick}> Register now!</a>
            </Form.Item>
        </Form>
    );
}