// src/components/ChatWindow.js
import React from 'react';
import Message from './Message';

function ChatWindow({ messages }) {
  return (
    <div className="ChatWindow">
      {messages.map((msg, index) => (
        <Message key={index} content={msg.content} user={msg.user} />
      ))}
    </div>
  );
}

export default ChatWindow;
