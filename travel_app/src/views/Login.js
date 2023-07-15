import { Typography, Button, Checkbox, Form, Input, Space } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
import '../App.css';

export default function Login() {
    const navigate = useNavigate();
    // 提交表单且数据验证成功后回调事件
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        navigate('/map');
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
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
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
                <br/>
                Or
                <a onClick={handleRegisterClick}> Register now!</a>
            </Form.Item>
        </Form>
    );
}