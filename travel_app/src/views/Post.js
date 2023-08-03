import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Input } from 'antd';

export default function Post() {
  const { postId } = useParams(); // Get the postId from the URL parameters
  // State to store the reply text
  const [replyText, setReplyText] = useState('');

  // Function to handle reply submission
  const handleReplySubmit = () => {
    // Do something with the reply text, for example, make an API call to save the reply
    console.log('Reply submitted:', replyText);

  };

  return (
    <div>
      <h1>Reply to Post {postId}</h1>
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