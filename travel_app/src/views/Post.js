import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Input, Avatar, Typography, List, message, Image, Space } from 'antd';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import ShareMap from './ShareMap';
import axios from 'axios';
import '../assets/styles/post.css';
import CommentList from './CommentList'

const { Title, Paragraph } = Typography;

export default function Post() {
  let userStr = localStorage.getItem("user") || "{}"
  let user = JSON.parse(userStr);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const { postId } = useParams(); // Get the postId from the URL parameters
  // State to store the reply text
  const [replyText, setReplyText] = useState('');
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const position = 'bottom';
  const align = 'center';

  const [comments, setComments] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalComments, setTotalComments] = useState(0);
  const pageSize = 10; // 每页显示的评论数

  // 回复评论相关参数
  const [replyingTo, setReplyingTo] = useState(null); // 当前正在回复的评论ID，null表示没有回复
  const [replyCommentText, setReplyCommentText] = useState(''); // 回复的文本内容
  const [expandedRepliesCommentId, setExpandedRepliesCommentId] = useState(null);

  function convertToDate(timeArray) {
    // 注意：月份减1，因为JavaScript中月份是从0开始的
    const [year, month, day, hour, minute, second] = timeArray;
    return new Date(year, month - 1, day, hour, minute, second);
  }

  function timeAgo(timeArray) {
      const postDate = convertToDate(timeArray);
      const currentDate = new Date();
      const timeDiff = currentDate.getTime() - postDate.getTime();

      // Calculate the time in seconds, minutes, hours, or days
      const seconds = Math.floor(timeDiff / 1000);
      const minutes = Math.floor(timeDiff / (1000 * 60));
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      if (days > 0) {
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
      } else if (hours > 0) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
      } else if (minutes > 0) {
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
      } else {
        return `less than 1 minute ago`;
      }
  }

  const fetchPost = () => {
      // Make an API call to fetch the user data, including the avatarUrl
      axios.get(`${apiUrl}/user/post/${postId}`)
        .then((response) => {
          if (response.data.code === 1) {
            console.log(response.data);
            const postData = response.data.data;

            setPost(postData);
          } else {
            console.log(response.data.msg);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching post data:', error);
          setIsLoading(false);
        });
  };

  const fetchComments = (page = 1) => {
    const queryParams = `?entityId=${postId}&entityType=1&page=${page}&pageSize=10`;

    axios.get(`${apiUrl}/user/comment/page/${queryParams}`)
      .then((response) => {
        if (response.data.code === 1) {
          setComments(response.data.data.records); // 返回的数据
          console.log('Fetch Comments: ', response.data.data);
          setTotalComments(response.data.data.total); // 总评论数
          setIsLoading(false);
        } else {
          console.log(response.data.msg);
        }
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
        setIsLoading(false);
      });
};

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);


  // Function to handle reply submission
  const handleReplySubmit = () => {
    const newComment = {
      postId: postId,
      content: replyText,
      userId: user.id, // You can get the username from your user object
      username: user.username,
      avatar: user.avatar,
    };

    // Make a POST request to the backend to save the new comment
    axios.post(`${apiUrl}/user/post/reply`, newComment)
      .then((response) => {
        // Handle successful response, for example, show a success message
        console.log(response.data);
        message.success('Reply added successfully!');
        // Reset the replyText after submission
        setReplyText('');
        fetchPost();
        setCurrentPage(1);
        fetchComments();
      })
      .catch((error) => {
        // Handle error, for example, show an error message
        console.error('Error adding reply:', error);
        message.error('Failed to add reply. Please try again later.');
      });
  };


  // const toggleLike = (id) => {
  //   setLikes({ ...likes, [id]: !likes[id] });
  // };

  const handleReplyClick = (commentId) => {
    if (replyingTo === commentId) {
      // 如果已经在回复这个评论，则关闭回复框
      setReplyingTo(null);
      setReplyCommentText('');
    } else {
      // 否则，打开回复框并设置为回复这个评论
      setReplyingTo(commentId);
      setReplyCommentText('');
    }
  };

  const submitCommentReply = (commentId, targetId) => {
    // 构造回复对象
    const newReply = {
      postId: postId, // 假设您已经有这个值
      content: replyCommentText,
      userId: user.id,
      username: user.username,
      avatar: user.avatar,
      commentId: commentId,
      targetId: targetId
    };
  
    // 发送回复到后端（伪代码）
    axios.post(`${apiUrl}/user/comment/reply`, newReply)
      .then(response => {
        message.success('Reply added successfully!');
        // 更新评论列表或直接添加新回复到状态
        fetchComments()
        setReplyingTo(null); // 关闭回复输入框
        setReplyCommentText(''); // 清空回复文本
      })
      .catch(error => {
        console.error('Failed to add reply:', error);
        message.error('Failed to add reply. Please try again.');
      });
  };

  const handleLike = async (entityType, commentId, entityUserId) => {
    // 在这里发送请求到后端以更新点赞状态
    // 根据响应来更新点赞数和点赞状态
    // 构造请求体，包含所有需要的参数
    const requestBody = {
        entityType: entityType,
        userId: user.id, // 假设user对象包含当前用户的ID
        entityId: commentId, // 假设1代表评论的实体类型，根据你的实际情况调整
        entityUserId: entityUserId,
        postId: postId
    };

    try {
        const response = await axios.post(`${apiUrl}/user/like`, requestBody);
        if (response.data.code === 1) {
          // 假设后端成功处理了点赞请求并返回了更新后的点赞数
          // 更新评论列表以反映新的点赞数和状态
          if (entityType === 2) {
            updateCommentLikes(commentId, response.data.data);
          }
          if (entityType === 1) {
            // 更新帖子的点赞状态和数量
            setPost(prevPost => ({
              ...prevPost,
              likeStatus: response.data.data.likeStatus,
              likeCount: response.data.data.likeCount
            }));
          }
        }
    } catch (error) {
        console.error('Error liking comment:', error);
        message.error('Failed to like the comment. Please try again later.');
    }
  };

  // 用于更新特定评论的点赞状态和数量
  const updateCommentLikes = (commentId, likeVO) => {
    setComments(prevComments => prevComments.map(comment => {
        if (comment.id === commentId) {
            return {
                ...comment,
                likeStatus: likeVO.likeStatus,
                likeCount: likeVO.likeCount,
            };
        }
        return comment;
    }));
  };

  const toggleRepliesVisibility = (commentId) => {
    if (expandedRepliesCommentId === commentId) {
      setExpandedRepliesCommentId(null); // 如果点击的是已展开的评论，隐藏回复列表
    } else {
      setExpandedRepliesCommentId(commentId); // 否则展开新的回复列表
    }
  };

  // Conditional rendering based on the post state
  if (isLoading || !post) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  return (
    <div>
      <div className='post-title' style={{ textAlign: 'left' }}>
        <Title level={2}>{post.title}</Title>
      </div>
      <div className='avatar-info-container' style={{ display: 'flex', alignItems: 'center' }}>
        <Link to={`/profile/${post.userId}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
          <div className='avatar-container' style={{ marginRight: '16px' }}>
            <Avatar src={post.avatar} size={64} />
          </div>
          <div className='post-username'>
            <Title level={4}>{post.username}</Title>
          </div>
        </Link>
      </div>
      <div className='post-content' style={{ textAlign: 'left' }}>
        <Paragraph>{post.content}</Paragraph>
      </div>
      <div className='post-map'>
        <ShareMap pathId={post.pathId}/>
      </div>
      <Input.TextArea
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        rows={4}
        placeholder="Enter your reply..."
      />
      <div className='post-button'>
        <Button onClick={handleReplySubmit}>Reply</Button>
        <Button type="text"
          icon={<LikeOutlined style={{ color: post.likeStatus === 1 ? 'red' : 'gray',  marginRight: 10}} />}
          onClick={() => handleLike(1, postId, post.userId)}
        >
          {post.likeCount > 0 ? post.likeCount : 'Like'}
        </Button>
      </div>
      {comments.length === 0 ? (
        <div className='post-noreply'> No replies yet </div>
      ) : (
      <List
        pagination={{
          position,
          align,
          current: currentPage,
          pageSize: pageSize,
          total: totalComments,
          onChange: (page) => {
            setCurrentPage(page);
            fetchComments(page);
          },
        }}
        dataSource={comments}
        renderItem={(comment) => (
          <List.Item
            actions={[
            ]}
          >
            <List.Item.Meta
              avatar={
                <Link to={`/profile/${comment.userId}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                  <Avatar src={comment.avatar} />
                </Link>
              }
              title={comment.username}
              description={
                <>
                  {comment.content}
                  <div style={{ marginTop: '8px', fontSize: '12px', color: 'gray', paddingTop: '10px'}}>
                    {`Replied ${timeAgo(comment.createTime)} `}
                    <Button
                      type="text"
                      icon={<LikeOutlined style={{ color: comment.likeStatus === 1 ? 'red' : 'gray' }} />}
                      onClick={() => handleLike(2, comment.id, comment.userId)}
                    >
                      {comment.likeCount > 0 ? comment.likeCount : 'Like'}
                    </Button>
                    <Button
                      type="text"
                      icon={<MessageOutlined />}
                      onClick={() => handleReplyClick(comment.id)}
                    >
                      Reply
                    </Button>
                    {/* 回复显示按钮 */}
                    {comment.replies && comment.replies.length > 0 && (
                      <Button
                        type="text"
                        onClick={() => toggleRepliesVisibility(comment.id)}
                      >
                        {expandedRepliesCommentId === comment.id ? 'Hide Replies' : `View Replies (${comment.replies.length})`}
                      </Button>
                    )}
                  </div>

                  {/* 当前评论被选中以回复时，显示回复输入框 */}
                  {replyingTo === comment.id && (
                    <div style={{ marginTop: 16, marginLeft: 10, marginBottom: 10}}>
                      <Input.TextArea
                        rows={2}
                        value={replyCommentText}
                        onChange={(e) => setReplyCommentText(e.target.value)}
                        placeholder="Enter your reply..."
                      />
                      <Button
                        type="primary"
                        style={{ marginTop: 8 }}
                        onClick={() => submitCommentReply(comment.id, comment.userId)}
                      >
                        Submit
                      </Button>
                    </div>
                  )}

                  {/* 回复列表 */}
                  {expandedRepliesCommentId === comment.id && comment.replies && comment.replies.length > 0 && (
                    <CommentList 
                      initialComments={comment.replies} 
                      parentId={comment.id} 
                      parentUsername={comment.username} 
                      fetchComments={fetchComments}
                      postId={postId}
                    />
                  )}
                </>
              }

            />
          </List.Item>
        )}
      />
      )}
    </div>
  );
}