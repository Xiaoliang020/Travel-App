import React, { useState, useEffect } from 'react';

export default function HelloWorld() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/hello')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return <div>{message}</div>;
}
