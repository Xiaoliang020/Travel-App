import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Input, Avatar, Typography } from 'antd';
import axios from 'axios';
import '../assets/styles/post.css';

const { Title, Paragraph } = Typography;

export default function Post() {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const { postId } = useParams(); // Get the postId from the URL parameters
  // State to store the reply text
  const [replyText, setReplyText] = useState('');
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
      // Make an API call to fetch the user data, including the avatarUrl
      axios.get(`${apiUrl}/api/post/${postId}`)
        .then((response) => {
          if (response.data.code === '0') {
            console.log(response.data);
            setPost(response.data.data);
          } else {
            console.log(response.data.msg);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching post data:', error);
          setIsLoading(false);
        });
  }, []);

  // Function to handle reply submission
  const handleReplySubmit = () => {
    // Do something with the reply text, for example, make an API call to save the reply
    console.log('Reply submitted:', replyText);

  };

  // Conditional rendering based on the post state
  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  if (!post) {
    return <div>Post not found</div>; // Show a message if the post is not found
  }

  return (
    <div>
      <div className='post-title' style={{ textAlign: 'left' }}>
        <Title level={2}>{post.title}</Title>
      </div>
      <div className='avatar-info-container' style={{ display: 'flex', alignItems: 'center' }}>
        <div className='avatar-container' style={{ marginRight: '16px' }}>
          <Avatar src={post.avatarid} size={64} />
        </div>
        <div className='post-username'>
          <Title level={4}>{post.username}</Title>
        </div>
      </div>
      <div className='post-content' style={{ textAlign: 'left' }}>
        <Paragraph>{post.content}</Paragraph>
      </div>
      <Input.TextArea
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        rows={4}
        placeholder="Enter your reply..."
      />
      <Button onClick={handleReplySubmit}>Submit</Button>
    </div>
  );
}