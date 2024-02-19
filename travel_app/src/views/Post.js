import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Input, Avatar, Typography, List, message, Image } from 'antd';
import ShareMap from './ShareMap';
import axios from 'axios';
import '../assets/styles/post.css';

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

  const fetchPost = () => {
      // Make an API call to fetch the user data, including the avatarUrl
      axios.get(`${apiUrl}/api/post/${postId}`)
        .then((response) => {
          if (response.data.code === '0') {
            console.log(response.data);
            const postData = response.data.data;
            const commentData = response.data.data.comments ?? [];

          // Fetch the user avatar for the post
          const fetchPostAvatar = axios
            .get(`${apiUrl}/img/${postData.avatarid}`)
            .then((avatarResponse) => {
              if (avatarResponse.data.code === '0') {
                const avatarData = avatarResponse.data.data;
                postData.avatar = `data:image/png;base64,${avatarData}`;
              }
            })
            .catch((error) => {
              console.error('Error fetching post avatar:', error);
            });

            // Fetch the user avatar for each post and update the data array
            const fetchCommentAvatars = commentData.map((comment) => {
              return axios
                .get(`${apiUrl}/api/avatar/${comment.userid}`)
                .then((avatarResponse) => {
                  if (avatarResponse.data.code === '0') {
                      const avatarData = avatarResponse.data.data;
                      comment.avatar = `data:image/png;base64,${avatarData}`;
                    }
                })
                .catch((error) => {
                  console.error('Error fetching user avatar:', error);
                });
            });
            // Wait for all the avatar fetch calls to finish before updating the data array
            Promise.all([fetchPostAvatar, ...fetchCommentAvatars])
              .then(() => {
                // Sort the posts by createdAt in descending order (newest first)
                commentData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                setPost(postData);
                setComments(commentData);
              })
              .catch((error) => {
                console.error('Error fetching user avatars:', error);
              });
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

  useEffect(() => {
    fetchPost();
  }, []);

  // Function to handle reply submission
  const handleReplySubmit = () => {
    const newComment = {
      content: replyText,
      userid: user.id, // You can get the username from your user object
      username: user.username,
      avatarid: user.avatarUrl,
    };

    // Make a POST request to the backend to save the new comment
    axios.post(`${apiUrl}/api/post/${postId}/reply`, newComment)
      .then((response) => {
        // Handle successful response, for example, show a success message
        console.log(response.data);
        message.success('Reply added successfully!');
        // Reset the replyText after submission
        setReplyText('');
        fetchPost();
      })
      .catch((error) => {
        // Handle error, for example, show an error message
        console.error('Error adding reply:', error);
        message.error('Failed to add reply. Please try again later.');
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
        <ShareMap pathId={post.pathid}/>
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
        }}
        dataSource={comments}
        renderItem={(comment) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src={comment.avatar} />
              }
              title={comment.username}
              description={comment.content}
            />
          </List.Item>
        )}
      />
      )}
    </div>
  );
}