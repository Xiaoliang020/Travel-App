import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import '../assets/styles/conversation.css';
import { Pagination, Button } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import axios from 'axios';
import SendMessageModal from './SendMessageModal';

const Conversation= () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const fromUsername = searchParams.get('username');

    let userStr = localStorage.getItem("user") || "{}"
    let user = JSON.parse(userStr);
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const pageSize = 10; // 设置每页显示的对话数量
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [messages, setMessages] = useState([]);
    const { conversationId } = useParams();

    const [visible, setVisible] = useState(false);


    // 这里应该是获取会话历史的API调用
    const fetchConversation = async () => {
        const response = await axios.get(`${apiUrl}/user/message/conversation`, {
            params: {
                conversationId: conversationId,
                page: currentPage,
                pageSize: pageSize,
            },
        });
        setMessages(response.data.data.records);
        setTotalPages(response.data.data.total);
    };
  
    useEffect(() => {
  
        fetchConversation();
        console.log(conversationId);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
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
            <div className="conversation-header">
                <div className="conversation-title">Messages from {fromUsername}</div>
                <button className="send-message-button" onClick={() => setVisible(true)}>Send a Message</button>
                <SendMessageModal
                    visible={visible}
                    setVisible={setVisible}
                    refreshMessages={fetchConversation}
                    toName={fromUsername}
                />
            </div>
            <div className="conversation">
                {messages.map((msg, index) => {
                    const isCurrentUser = msg.fromId === user.id;
                    const messageClass = isCurrentUser ? 'message current-user' : 'message';
                    return (
                    <div key={index} className={messageClass}>
                        <img src={msg.avatar} alt={msg.userName} className="avatar" />
                        <div className="message-bubble">
                        <div className="message-header">{msg.username}</div>
                        <div className="message-text">{msg.content}</div>
                        <div className="message-timestamp">{formatDate(msg.createTime)}</div>
                        </div>
                    </div>
                    );
                })}
            </div>
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
  
  export default Conversation;