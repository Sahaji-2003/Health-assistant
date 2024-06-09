// src/components/Message.js
import React from 'react';

function Message({ content, user }) {
  return (
    <div className={`Message ${user ? 'user' : 'bot'}`}>
      {content}
    </div>
  );
}

export default Message;
