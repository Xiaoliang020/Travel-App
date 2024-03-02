import React, { useState, useEffect } from 'react';
import { Button, List, Avatar, Pagination, Badge } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SendMessageModal from './SendMessageModal';

// const messagesData = [
//   // 示例数据，实际应用中应该从后端服务获取
//   { id: 1, user: 'Alice', avatar: '/path/to/alice-avatar.jpg', message: 'Hi there!', timestamp: '10 mins ago', unreadCount: 2 },
//   { id: 2, user: 'Bob', avatar: '/path/to/bob-avatar.jpg', message: 'Hello!', timestamp: '20 mins ago', unreadCount: 0 },
//   // ...更多消息
// ];

const pageSize = 10; // 设置每页显示的消息数量

const PrivateMessageList = () => {
  let userStr = localStorage.getItem("user") || "{}"
  let user = JSON.parse(userStr);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const [messages, setMessages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [visible, setVisible] = useState(false);

  const fetchMessages = async () => {
    try {
      // 替换成你的API地址
      const response = await axios.get(`${apiUrl}/user/message/page`, {
        params: {
          userId: user.id,
          page: currentPage,
          pageSize: pageSize,
        },
      });
      setMessages(response.data.data.records);
      setTotalPages(response.data.data.total);
    } catch (error) {
      console.error('Error fetching messages:', error);
      // 处理错误情况
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // 这里可以处理分页逻辑，可能需要请求新的数据
  };

  const formatDate = (createTime) => {
    // 由于月份是从1开始的，所以创建Date对象时需要对月份值减1
    const date = new Date(createTime[0], createTime[1] - 1, createTime[2], createTime[3], createTime[4]);
    // 使用Intl.DateTimeFormat或其他方法格式化日期
    return new Intl.DateTimeFormat('default', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <h2>Private Messages</h2>
        <Button icon={<MessageOutlined /> } type="primary" onClick={() => setVisible(true)}>
          Send Message
        </Button>
        <SendMessageModal
            visible={visible}
            setVisible={setVisible}
            refreshMessages={fetchMessages}
        />
      </div>
      <List
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={item => (
            <Link to={`/conversation/${item.conversationId}?username=${encodeURIComponent(item.username)}`} >
                <List.Item onClick={() => console.log('Open message', item.id)}>
                    <List.Item.Meta
                        avatar={
                            <Badge count={item.unread} overflowCount={99}>
                                <Avatar src={item.avatar} size={64} />
                            </Badge>
                        }
                        title={item.username}
                        description={
                        <div>
                        <div>{item.content}</div>
                        <div style={{ marginTop: '8px', fontSize: '12px', color: 'gray', paddingTop: '10px'}}>
                            <div>{formatDate(item.createTime)}</div>
                        </div>
                        </div>
                    }
                    />
                </List.Item>
            </Link>
        )}
      />
      <Pagination
        current={currentPage}
        onChange={handlePageChange}
        total={totalPages}
        pageSize={pageSize}
        showSizeChanger={false}
      />
    </div>
  );
};

export default PrivateMessageList;
