import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Avatar, Button, Statistic, Row, Col, Space, message } from 'antd';
import { UserOutlined, HeartOutlined } from '@ant-design/icons';
import axios from 'axios';
import FollowerList from './FollowerList'
import FollowList from './FollowList'

const UserProfile = () => {
  let userStr = localStorage.getItem("user") || "{}"
  let user = JSON.parse(userStr);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);

  const [isFollowing, setIsFollowing] = useState(false); // 标记是否已关注

  console.log(userId);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user/profile/${userId}`);
        if (response.data.code === 1) {
            setUserProfile(response.data.data); // 假设后端直接返回用户资料对象
            setIsFollowing(response.data.data.hasFollowed);
            console.log(response.data.data);
        } else {
            message.error('Failed to fetch profile.');
        }
        
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        // 处理错误情况，例如显示错误消息
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId, isFollowing]);

  const handleFollow = async () => {
    const followURL = isFollowing ? `${apiUrl}/user/follow/unfollow` : `${apiUrl}/user/follow`;
    try {
      await axios.post(followURL, {
        userId: user.id,
        entityId: userId,
        entityType: 3
      });
      setIsFollowing(!isFollowing); // 更新关注状态
    } catch (error) {
      console.error('Failed to update follow status:', error);
      // 错误处理逻辑
    }
  };

  if (!userProfile) {
    return <div>Loading...</div>; // 或者其他加载指示器
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Avatar
          size={100}
          src={userProfile.avatar}
          icon={!userProfile.avatar && <UserOutlined />}
        />
        <h2 style={{ fontSize: '24px' }}>{userProfile.username}</h2>
        {/* 当被查看的用户ID不等于当前登录用户ID时显示关注按钮 */}
        {userId != user.id && (
            <Button onClick={handleFollow} type='primary'>
                {isFollowing ? '取消关注' : '关注'}
            </Button>
        )}
        <Row gutter={16}>
          <Col span={8}>
            <Link to={`/follower/${userId}`} style={{alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
              <Statistic title="Follwers" value={userProfile.followerCount} />
            </Link>
          </Col>
          <Col span={8}>
            <Link to={`/following/${userId}`} style={{alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
              <Statistic title="Following" value={userProfile.followingCount} />
            </Link>
          </Col>
          <Col span={8}>
            <Statistic title="Likes" value={userProfile.likeCount} prefix={<HeartOutlined />} />
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default UserProfile;
