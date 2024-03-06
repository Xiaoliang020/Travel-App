import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { List, Pagination, Avatar, Typography, Tooltip } from 'antd';
import { CommentOutlined, HeartOutlined, UserAddOutlined } from '@ant-design/icons';

const { Text } = Typography;

const NotificationDetail = () => {
  const { type } = useParams();
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10; // 假设每页显示10个通知

  let userStr = localStorage.getItem("user") || "{}"
  let user = JSON.parse(userStr);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
            const apiUrl = process.env.REACT_APP_API_BASE_URL;
            try {
                const response = await axios.get(`${apiUrl}/user/message/notifications`, {
                    params: { 
                        topic: type,
                        userId: user.id,
                        page: currentPage,
                        pageSize: pageSize, 
                    }
                });
                setNotifications(response.data.data.records);
                setTotal(response.data.data.total);
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
            }
        };

        fetchNotifications();
    }, [currentPage, pageSize]);

    // 创建日期格式化函数
    const formatDate = (createTime) => {
        return new Date(createTime[0], createTime[1] - 1, createTime[2], createTime[3], createTime[4]).toLocaleString();
    };

    // 根据通知类型选择图标
    const icon = type === 'comment' ? <CommentOutlined style={{ color: 'royalblue' }} /> :
                type === 'like' ? <HeartOutlined style={{ color: 'crimson' }} /> :
                <UserAddOutlined style={{ color: 'green' }} />;

    // 生成通知描述
    const description = type === 'comment' ? 'commented on your post' :
                        type === 'like' ? 'liked your post' :
                        'followed you';

    const handleNotificationClick = (item) => {
        if (type === 'comment' || type === 'like') {
            navigate(`/post/${item.postId}`);
        } else if (type === 'follow') {
            navigate(`/profile/${item.userId}`);
        }
    };

    return (
        <>
        <List
            dataSource={notifications}
            renderItem={item => (
            <List.Item onClick={() => handleNotificationClick(item)}>
                {/* Render notification item */}
                <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {icon} <Text style={{ marginLeft: 8 }}>{item.username}</Text>
                    </div>
                    }
                    description={description}
                />
                <div>
                    <Tooltip title={formatDate(item.createTime)}>
                        <Text type="secondary">{formatDate(item.createTime)}</Text>
                    </Tooltip>
                </div>
            </List.Item>
            )}
        />
        <Pagination
            current={currentPage}
            total={total}
            pageSize={pageSize}
            onChange={page => setCurrentPage(page)}
        />
        </>
    );
};

export default NotificationDetail;
