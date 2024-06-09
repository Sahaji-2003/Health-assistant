// src/components/MessageInput.js
import React, { useState } from 'react';

function MessageInput({ onSubmit }) {
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={message} onChange={handleChange} />
      <button type="submit">Send</button>
    </form>
  );
}

export default MessageInput;
