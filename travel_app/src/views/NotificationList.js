import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Avatar, Badge } from 'antd';
import { CommentOutlined, HeartOutlined, UserAddOutlined } from '@ant-design/icons';
import '../assets/styles/post.css';
import axios from 'axios';


const NotificationItem = ({ notification }) => {
  const { type, createTime, username, count, unread, entityType } = notification;

  const entityTypeMap = {
    1: 'post',
    2: 'comment',
    // 可以根据需要添加更多的映射
  };

  const navigate = useNavigate();

  // 添加跳转函数
  const handleNavigate = () => {
    navigate(`/notifications/${notification.type}`);
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

  // 根据通知类型选择图标
  const avatarIcon = type === 'comment' ? <CommentOutlined /> :
                     type === 'like' ? <HeartOutlined /> :
                     <UserAddOutlined />;

  const avatarBgColor = type === 'comment' ? '#add8e6' : // 灰色
                        type === 'like' ? '#ffcccc' : // 浅红色
                        '#ccffcc'; // 浅绿色

  return (
    <List.Item
      actions={[<span>{formatDate(createTime)}</span>, <span>Total: {count}</span>]}
      onClick={handleNavigate}
    >
      <List.Item.Meta
        avatar={
          <Badge count={unread} offset={[-50, 0]}>
            <Avatar icon={avatarIcon} size={56} style={{ backgroundColor: avatarBgColor }}/>
          </Badge>
        }
        title={type}
        description={
          type === 'comment' ? `${notification.username} commented on your ${entityTypeMap[entityType]}.` :
          type === 'like' ? `${notification.username} Liked your post.` :
          `${notification.username} Followed you.`
        }
      />
    </List.Item>
  );
};

const NotificationList = () => {

    let userStr = localStorage.getItem("user") || "{}"
    let user = JSON.parse(userStr);
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/user/message/notice`);
                console.log(response.data.data);
                setData(response.data.data); // 将响应数据保存到状态中
                setIsLoading(false);
            } catch (error) {
                console.error('There was an error!', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Conditional rendering based on the post state
    if (isLoading || !data) {
        return <div>Loading...</div>; // Show a loading indicator while fetching data
    }
  
    return (
        <List
        dataSource={data}
        renderItem={item => (
            <NotificationItem notification={item} key={item.entityId} />
        )}
        />
    );
};

export default NotificationList;
