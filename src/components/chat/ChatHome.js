// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';
// import Sidebar from './Sidebar';
// import ChatHeader from './ChatHeader';
// import ChatArea from './ChatArea';
// import MessageInput from './MessageInput';
// import './chat.css';



// const socket = io('http://localhost:4000');

// function ChatHome() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [currentRecipient, setCurrentRecipient] = useState('');
//   const [users, setUsers] = useState([]);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState({});
//   const [registerMode, setRegisterMode] = useState(true);
//   const [unreadMessages, setUnreadMessages] = useState({});

//   useEffect(() => {
//     socket.on('userList', (userList) => {
//       setUsers(userList);
//     });

//     socket.on('private message', ({ sender, recipient, message }) => {
//       console.log(`Received message from ${sender} to ${recipient}: ${message}`);
//       setMessages((prevMessages) => ({
//         ...prevMessages,
//         [sender]: [...(prevMessages[sender] || []), { sender, message }],
//       }));

//       if (sender !== currentRecipient) {
//         setUnreadMessages((prevUnreadMessages) => ({
//           ...prevUnreadMessages,
//           [sender]: (prevUnreadMessages[sender] || 0) + 1,
//         }));
//       }
//     });

//     return () => {
//       socket.off('userList');
//       socket.off('private message');
//     };
//   }, [currentRecipient]);

//   const handleRegister = async () => {
//     try {
//       await axios.post('http://localhost:4000/register', { username, password });
//       alert('Registration successful');
//       setRegisterMode(false);
//     } catch (error) {
//       alert('Registration failed');
//     }
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://localhost:4000/login', { username, password });
//       setIsAuthenticated(true);
//       socket.emit('register', username);
//     } catch (error) {
//       alert('Login failed');
//     }
//   };

//   const sendMessage = () => {
//     if (currentRecipient) {
//       socket.emit('private message', { recipient: currentRecipient, message });
//       setMessages((prevMessages) => ({
//         ...prevMessages,
//         [currentRecipient]: [
//           ...(prevMessages[currentRecipient] || []),
//           { sender: username, message },
//         ],
//       }));
//       setMessage('');
//     } else {
//       alert('Please select a user to chat with.');
//     }
//   };

//   const selectRecipient = (recipient) => {
//     setCurrentRecipient(recipient);
//     setUnreadMessages((prevUnreadMessages) => ({
//       ...prevUnreadMessages,
//       [recipient]: 0,
//     }));
//   };

//   return (
//     <div className="App">
  
//       <div>
//         <h1>Chat Application</h1>
//         {!isAuthenticated ? (
//           <div>
//             <input
//               type="text"
//               placeholder="Enter username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <input
//               type="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             {registerMode ? (
//               <button onClick={handleRegister}>Register</button>
//             ) : (
//               <button onClick={handleLogin}>Login</button>
//             )}
//             <button onClick={() => setRegisterMode(!registerMode)}>
//               {registerMode ? 'Switch to Login' : 'Switch to Register'}
//             </button>
//           </div>
//         ) : (
//           <div className="chat-container">
//             <Sidebar
//               users={users}
//               username={username}
//               setCurrentRecipient={selectRecipient}
//               unreadMessages={unreadMessages}
//             />
//             <div className="chat-area">
//               {currentRecipient && <ChatHeader currentRecipient={currentRecipient} />}
//               <ChatArea
//                 messages={messages[currentRecipient] || []}
//                 username={username}
//               />
//               <MessageInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ChatHome;


import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Sidebar from './Sidebar';
import ChatHeader from './ChatHeader';
import ChatArea from './ChatArea';
import MessageInput from './MessageInput';
import doctorLogo from './image/doctor.png'; // Add the path to your logo images
import patientLogo from './image/patient.png';

const socket = io('http://localhost:4000');

function ChatHome() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentRecipient, setCurrentRecipient] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState({});
  const [registerMode, setRegisterMode] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState({});

  useEffect(() => {
    socket.on('userList', (userList) => {
      setUsers(userList);
    });

    socket.on('private message', ({ sender, recipient, message }) => {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [sender]: [...(prevMessages[sender] || []), { sender, message }],
      }));

      if (sender !== currentRecipient) {
        setUnreadMessages((prevUnreadMessages) => ({
          ...prevUnreadMessages,
          [sender]: (prevUnreadMessages[sender] || 0) + 1,
        }));
      }
    });

    return () => {
      socket.off('userList');
      socket.off('private message');
    };
  }, [currentRecipient]);

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:4000/register', { username, password });
      alert('Registration successful');
      setRegisterMode(false);
    } catch (error) {
      alert('Registration failed');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/login', { username, password });
      setIsAuthenticated(true);
      socket.emit('register', username);
    } catch (error) {
      alert('Login failed');
    }
  };

  const sendMessage = () => {
    if (currentRecipient) {
      socket.emit('private message', { recipient: currentRecipient, message });
      setMessages((prevMessages) => ({
        ...prevMessages,
        [currentRecipient]: [
          ...(prevMessages[currentRecipient] || []),
          { sender: username, message },
        ],
      }));
      setMessage('');
    } else {
      alert('Please select a user to chat with.');
    }
  };

  const selectRecipient = (recipient) => {
    setCurrentRecipient(recipient);
    setUnreadMessages((prevUnreadMessages) => ({
      ...prevUnreadMessages,
      [recipient]: 0,
    }));
  };

  return (
    <div style={styles.appContainer}>
      <div style={styles.header}>
        <img src={patientLogo} alt="Patient Logo" style={styles.logo} />
        <h1>Patient-Doctor Chat Application</h1>
        <img src={doctorLogo} alt="Doctor Logo" style={styles.logo} />
      </div>
      {!isAuthenticated ? (
        <div style={styles.authContainer}>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.authInput}
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.authInput}
          />
          {registerMode ? (
            <button onClick={handleRegister} style={styles.authButton}>Register</button>
          ) : (
            <button onClick={handleLogin} style={styles.authButton}>Login</button>
          )}
          <button onClick={() => setRegisterMode(!registerMode)} style={styles.authSwitch}>
            {registerMode ? 'Switch to Login' : 'Switch to Register'}
          </button>
        </div>
      ) : (
        <div style={styles.chatContainer}>
          <Sidebar
            users={users}
            username={username}
            setCurrentRecipient={selectRecipient}
            unreadMessages={unreadMessages}
          />
          <div style={styles.chatArea}>
            {currentRecipient && <ChatHeader currentRecipient={currentRecipient} />}
            <ChatArea
              messages={messages[currentRecipient] || []}
              username={username}
            />
            <MessageInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '10px 0',
    borderBottom: '2px solid #007bff',
  },
  logo: {
    width: '50px',
    height: '50px',
  },
  authContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
  },
  authInput: {
    marginBottom: '10px',
    padding: '10px',
    width: '250px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  authButton: {
    padding: '10px 20px',
    marginTop: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  authButtonHover: {
    backgroundColor: '#0056b3',
  },
  authSwitch: {
    marginTop: '10px',
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  authSwitchHover: {
    color: '#0056b3',
  },
  chatContainer: {
    display: 'flex',
    width: '100%',
    maxWidth: '1200px',
    marginTop: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  chatArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
  },
};

export default ChatHome;
