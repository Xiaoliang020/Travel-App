import {
    Button,
    Checkbox,
    Form,
    Input,
    Select,
    message,
} from 'antd';
import React, { startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export default function Register() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const onFinish = (values) => {
        // 转换性别值：如果选择的是"male"，则设置为1；如果是"female"，则设置为0。
        const genderValue = values.gender === 'male' ? 1 : 0;
        // 更新values对象中的gender值
        const updatedValues = { ...values, gender: genderValue };

        console.log('Received values of form: ', updatedValues);

        // Make an HTTP POST request to the backend
        axios.post(`${apiUrl}/user/user`, updatedValues)
        .then((response) => {
            console.log(response);
            // Check the response code
            if (response.data.code === 1) {
                // Registration successful
                console.log('Registration successful!', response.data);
                message.success('Registration success! Log in now!');
                startTransition(() => {
                    navigate('/login');
                });
            } else {
                // Registration failed due to user already existing
                console.error('Registration failed:', response.data.msg);
                if (response.data.msg === 'The email already exists') {
                    message.error('This email has been registered. Please choose a different email.');
                } else if (response.data.msg === 'The username already exists') {
                    message.error('Username already exists. Please choose a different username.');
                }
            }
        })
        .catch((error) => {
            // Handle network or other errors
            console.error('Registration failed:', error);
            message.error('Registration failed. Please try again later.');
        });
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            className="register-form"
            onFinish={onFinish}
            scrollToFirstError
        >
            <h3 className='register_title'>
                Account Sign Up
            </h3>
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="username"
                label="Username"
                tooltip="What do you want others to call you?"
                rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                    {
                        required: true,
                        message: 'Please input your phone number!',
                    },
                    {
                        pattern: /^1[3-9]\d{9}$/,
                        message: 'The input is not a valid phone number!',
                    },
                ]}
            >
                <Input style={{ width: '100%' }} />
            </Form.Item>


            <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: 'Please select gender!' }]}
            >
                <Select placeholder="select your gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    {/* 别搞LGBT */}
                    {/* <Option value="other">Other</Option> */}
                </Select>
            </Form.Item>

            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                    },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    I have read the <a href="">agreement</a>
                </Checkbox>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button block type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
}