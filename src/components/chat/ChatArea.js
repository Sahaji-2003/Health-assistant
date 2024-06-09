// import React from 'react';
// import './chat.css';

// // function ChatArea({ messages }) {
// //   return (
// //     <div className="chat-area-messages">
// //       {messages.map((msg, index) => (
// //         <div key={index} className={`message ${msg.sender === 'Me' ? 'me' : 'other'}`}>
// //           <strong>{msg.sender}:</strong> {msg.message}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// // export default ChatArea;

// function ChatArea({ messages, username }) {
//   return (
//     <div className="chat-area-messages">
//       {messages.map((msg, index) => (
//         <div key={index} className={`message ${msg.sender === username ? 'me' : 'other'}`}>
//           {msg.message}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ChatArea;

import React from 'react';

const ChatArea = ({ messages, username }) => {
  return (
    <div style={styles.chatMessages}>
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            ...styles.message,
            alignSelf: msg.sender === username ? 'flex-end' : 'flex-start',
            backgroundColor: msg.sender === username ? '#d1e7dd' : '#f8d7da',
          }}
        >
          <strong>{msg.sender}: </strong> {msg.message}
        </div>
      ))}
    </div>
  );
};

const styles = {
  chatMessages: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    overflowY: 'auto',
  },
  message: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '10px',
    maxWidth: '70%',
  },
};

export default ChatArea;
