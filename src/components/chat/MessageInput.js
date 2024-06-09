// import React from 'react';
// import './chat.css';

// // function MessageInput({ message, setMessage, sendMessage }) {
// //   return (
// //     <div className="message-input">
// //       <input
// //         type="text"
// //         value={message}
// //         onChange={(e) => setMessage(e.target.value)}
// //         placeholder="Type your message"
// //       />
// //       <button onClick={sendMessage}>Send</button>
// //     </div>
// //   );
// // }

// // export default MessageInput;



// function MessageInput({ message, setMessage, sendMessage }) {
//   return (
//     <div className="message-input">
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type your message"
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// }

// export default MessageInput;

import React from 'react';

const MessageInput = ({ message, setMessage, sendMessage }) => {
  return (
    <div style={styles.messageInput}>
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={styles.input}
      />
      <button onClick={sendMessage} style={styles.sendButton}>Send</button>
    </div>
  );
};

const styles = {
  messageInput: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderTop: '1px solid #ccc',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  sendButton: {
    padding: '10px 20px',
    marginLeft: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  sendButtonHover: {
    backgroundColor: '#0056b3',
  },
};

export default MessageInput;


