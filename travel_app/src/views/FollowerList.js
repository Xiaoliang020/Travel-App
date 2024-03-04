import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { List, Avatar, Button, Pagination } from 'antd';

const FollowerList = () => {
  let userStr = localStorage.getItem("user") || "{}"
  let user = JSON.parse(userStr);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const [followers, setFollowers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { userId } = useParams();
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    // 假设这是获取关注用户列表的API
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user/follow/page/followers?userId=${userId}&page=${currentPage}&pageSize=${pageSize}`);
        setFollowers(response.data.data.records);
        console.log(response.data.data);
        setTotal(response.data.data.total);
      } catch (error) {
        console.error('Failed to fetch followers:', error);
      }
    };

    fetchFollowers();
  }, [currentPage]);

  const handleFollowToggle = async (followerId, hasFollowed) => {
    // 这里添加调用后端API来关注/取消关注用户的逻辑
    const followURL = hasFollowed ? `${apiUrl}/user/follow/unfollow` : `${apiUrl}/user/follow`;
    try {
      await axios.post(followURL, {
        userId: user.id,
        entityId: followerId,
        entityType: 3
      });
    } catch (error) {
      console.error('Failed to update follow status:', error);
      // 错误处理逻辑
    }
    // 更新本地状态以反映新的关注状态
    const updatedFollowers = followers.map(follower =>
      follower.id === followerId ? { ...follower, hasFollowed: !hasFollowed } : follower
    );
    setFollowers(updatedFollowers);
  };

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={followers}
        renderItem={item => (
          <List.Item
            actions={[
              // 使用条件渲染来决定是否显示关注按钮
              user.id !== item.id && (
                <Button
                  type={item.hasFollowed ? 'default' : 'primary'}
                  onClick={() => handleFollowToggle(item.id, item.hasFollowed)}
                >
                  {item.hasFollowed ? '已关注' : '关注'}
                </Button>
              ),
            ].filter(Boolean)}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={item.username}
            />
          </List.Item>
        )}
      />
      <Pagination
        current={currentPage}
        onChange={page => setCurrentPage(page)}
        total={total}
        pageSize={pageSize} // 假设每页显示10个
      />
    </>
  );
};

export default FollowerList;
