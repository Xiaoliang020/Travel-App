import { List, Avatar, Button, Input, Space, message } from 'antd';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import axios from 'axios';

const CommentList = ({ initialComments, parentId, parentUsername, fetchComments }) => {
    let userStr = localStorage.getItem("user") || "{}"
    let user = JSON.parse(userStr);
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const position = 'bottom';
    const align = 'left';

    const [comments, setComments] = useState(initialComments);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // 每页显示的评论数

    useEffect(() => {
        setComments(initialComments);
    }, [initialComments]);

    // 回复评论相关参数
    const [replyingTo, setReplyingTo] = useState(null); // 当前正在回复的评论ID，null表示没有回复
    const [replyCommentText, setReplyCommentText] = useState(''); // 回复的文本内容
    
    // 状态和函数略去，参考之前的示例
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

    // const getUsernameById = async (userId) => {
    //     // 这里应该是您获取用户名称的逻辑，可能是查找一个数组或调用API
    //     // 假设返回了用户名称
    //     try {
    //         const response = await axios.get(`${apiUrl}/user/${userId}`);
    //         // 假设后端返回的数据结构是 { success: true, data: '用户名' }
    //         if (response.data.code === 1) {
    //             console.log('Reply to username: ', response.data.data);
    //             return response.data.data; // 返回用户名
    //         } else {
    //             throw new Error('Failed to fetch username');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching username:', error);
    //         throw error; // 可以根据需要处理错误或向上抛出
    //     }
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
          content: replyCommentText,
          userId: user.id,
          username: user.username,
          commentId: commentId,
          targetId: targetId
        };
      
        // 发送回复到后端（伪代码）
        axios.post(`${apiUrl}/user/comment/reply`, newReply)
          .then(response => {
            message.success('Reply added successfully!');
            // 更新评论列表或直接添加新回复到状态
            // 调用从父组件传入的函数以更新评论列表
            fetchComments();
            setReplyingTo(null); // 关闭回复输入框
            setReplyCommentText(''); // 清空回复文本
          })
          .catch(error => {
            console.error('Failed to add reply:', error);
            message.error('Failed to add reply. Please try again.');
          });
    };

    const handleLike = async (entityType, commentId) => {
        // 在这里发送请求到后端以更新点赞状态
        // 根据响应来更新点赞数和点赞状态
        // 构造请求体，包含所有需要的参数
        const requestBody = {
            entityType: entityType,
            userId: user.id, // 假设user对象包含当前用户的ID
            entityId: commentId, // 假设1代表评论的实体类型，根据你的实际情况调整
        };

        try {
            const response = await axios.post(`${apiUrl}/user/like`, requestBody);
            if (response.data.code === 1) {
                // 假设后端成功处理了点赞请求并返回了更新后的点赞数
                // 更新评论列表以反映新的点赞数和状态
                const updatedComments = comments.map(comment => {
                    if (comment.id === commentId) {
                      // 更新点赞状态和数量
                      return {
                        ...comment,
                        likeStatus: response.data.data.likeStatus,
                        likeCount: response.data.data.likeCount,
                      };
                    }
                    return comment;
                });
                setComments(updatedComments);
            }
        } catch (error) {
            console.error('Error liking comment:', error);
            message.error('Failed to like the comment. Please try again later.');
        }
    };

    return (
    <List
        pagination={{
            position,
            align,
            current: currentPage,
            pageSize: pageSize,
            onChange: (page) => {
                setCurrentPage(page);
            },
        }}
        dataSource={comments}
        renderItem={comment => {

            // 判断是否是直接回复主题，或者回复其他评论
            const isDirectReply = comment.entityId === parentId;
            let titleContent;
            if (isDirectReply) {
                titleContent = (
                    <Link to={`/profile/${comment.userId}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                        {comment.username}
                    </Link> 
                );
            } else {
                // 获取被回复的用户名称
                titleContent = (
                    <div>
                        <Link to={`/profile/${comment.userId}`} style={{ alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                            {comment.username}
                        </Link> 
                        <span style={{ color: '#89CFF0' }}> replied to </span>
                        {comment.targetName}
                    </div>
                );
            }

            return (
                <List.Item style={{ backgroundColor: '#f0f2f5' }}>
                    <List.Item.Meta
                        title={<div style={{ marginLeft: '20px' }}>{titleContent}</div>}
                        description={
                            <div>
                                <div style={{ marginLeft: '20px' }}>
                                    {comment.content}
                                    <div style={{ marginTop: '8px', fontSize: '12px', color: 'gray', paddingTop: '5px' }}>
                                        {`Replied ${timeAgo(comment.createTime)} `}
                                        <Button
                                            type="text"
                                            icon={<LikeOutlined style={{ color: comment.likeStatus === 1 ? 'red' : 'gray' }} />}
                                            onClick={() => handleLike(2, comment.id)}
                                            >
                                            {comment.likeCount > 0 ? comment.likeCount : 'Like'}
                                        </Button>
                                        {/* 根据 isDirectReply 来决定是否渲染回复按钮 */}
                                        {isDirectReply && (
                                            <Button type="text" icon={<MessageOutlined />} onClick={() => handleReplyClick(comment.id)}>Reply</Button>
                                        )}
                                    </div>
                                </div>
                            
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
                            </div>
                        }
                    />
                </List.Item>
            );
        }}
    />
  );
};

export default CommentList;
