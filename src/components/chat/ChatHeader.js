// import React from 'react';
// import './chat.css';

// // function ChatHeader({ currentRecipient }) {
// //   return (
// //     <div className="chat-header">
// //       <h2>{currentRecipient}</h2>
// //     </div>
// //   );
// // }

// // export default ChatHeader;



// function ChatHeader({ currentRecipient }) {
//   return (
//     <div className="chat-header">
//       <h2>{currentRecipient}</h2>
//     </div>
//   );
// }

// export default ChatHeader;


import React from 'react';

const ChatHeader = ({ currentRecipient }) => {
  return (
    <div style={styles.chatHeader}>
      <h3>Chat with {currentRecipient}</h3>
    </div>
  );
};

const styles = {
  chatHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '5px',
  },
};

export default ChatHeader;
