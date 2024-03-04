import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import axios from 'axios';

const SendMessageModal = ({ visible, setVisible, refreshMessages, toName }) => {
  let userStr = localStorage.getItem("user") || "{}"
  let user = JSON.parse(userStr);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [form] = Form.useForm();

  useEffect(() => {
    // 当toName改变并且不为空时，自动填充表单的toName字段
    if (toName) {
      form.setFieldsValue({ toName });
    }
  }, [toName, form]);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(`${apiUrl}/user/message`, {
        fromId: user.id,
        toName: values.toName,
        content: values.content,
      });

      if (response.data.code == 1) {
        // 处理成功的情况
        message.success('消息发送成功');
        setVisible(false); // 关闭模态框
        refreshMessages(); // 刷新消息列表
      } else {
        message.error('User Not Found!');
      }
    } catch (error) {
      // 处理错误的情况
      message.error('消息发送失败');
    }
  };

  return (
    <Modal
      title="Send a Message"
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="toName" label="Receiver" rules={[{ required: true, message: '请输入接收人用户名!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="content" label="Content" rules={[{ required: true, message: '请输入私信内容!' }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Send
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SendMessageModal;