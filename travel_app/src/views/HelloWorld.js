import React, { useState, useEffect } from 'react';

export default function HelloWorld() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/hello')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleClick = async () => {
    try {
      const response = await fetch('/print', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'Hello, Backend' }),
      });

      if (response.ok) {
        console.log('Message sent to backend successfully');
      } else {
        console.log('Failed to send message to backend');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div>{message}</div>
      <button onClick={handleClick}>Send Message to Backend</button>
    </div>
  );
}
