import { List, Avatar, Button, Input, Space, message } from 'antd';
import { useState, useEffect } from 'react';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import axios from 'axios';

const CommentList = ({ comments, parentId, parentUsername, fetchComments }) => {
    let userStr = localStorage.getItem("user") || "{}"
    let user = JSON.parse(userStr);
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

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

    return (
    <List
        dataSource={comments}
        renderItem={comment => {

            // 判断是否是直接回复主题，或者回复其他评论
            const isDirectReply = comment.entityId === parentId;
            let titleContent;
            if (isDirectReply) {
                titleContent = comment.username;
            } else {
                // 获取被回复的用户名称
                titleContent = (
                    <div>
                      {comment.username} 
                      <span style={{ color: '#89CFF0' }}> replied to </span>
                      {parentUsername}
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
                                        <Button type="text" icon={<LikeOutlined />}>Like</Button>
                                        <Button type="text" icon={<MessageOutlined />} onClick={() => handleReplyClick(comment.id)}>Reply</Button>
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
