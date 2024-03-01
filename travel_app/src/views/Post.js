import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
        <div className='avatar-container' style={{ marginRight: '16px' }}>
          <Avatar src={post.avatar} size={64} />
        </div>
        <div className='post-username'>
          <Title level={4}>{post.username}</Title>
        </div>
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
              // <Space>
              //   <Button
              //     type="text"
              //     // icon={<LikeOutlined style={{ color: likes[comment.id] ? 'red' : 'gray' }} />}
              //     icon={<LikeOutlined />}
              //     // onClick={() => toggleLike(comment.id)}
              //   >
              //     Like
              //   </Button>
              //   <Button
              //     type="text"
              //     icon={<MessageOutlined />}
              //     onClick={() => handleReplyClick(comment.id)}
              //   >
              //     Reply
              //   </Button>
              // </Space>
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src={comment.avatar} />
              }
              title={comment.username}
              description={
                <>
                  {comment.content}
                  <div style={{ marginTop: '8px', fontSize: '12px', color: 'gray', paddingTop: '10px'}}>
                    {`Replied ${timeAgo(comment.createTime)} `}
                    <Button
                      type="text"
                      // icon={<LikeOutlined style={{ color: likes[comment.id] ? 'red' : 'gray' }} />}
                      icon={<LikeOutlined />}
                      // onClick={() => toggleLike(comment.id)}
                    >
                      Like
                    </Button>
                    <Button
                      type="text"
                      icon={<MessageOutlined />}
                      onClick={() => handleReplyClick(comment.id)}
                    >
                      Reply
                    </Button>
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

                  {comment.replies && comment.replies.length > 0 && (
                    <CommentList comments={comment.replies} parentId={comment.id} parentUsername={comment.username} fetchComments={fetchComments}/>
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