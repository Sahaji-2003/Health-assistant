// // // src/App.js
// // import React, { useState } from 'react';
// // import ChatWindow from './ChatWindow';
// // import MessageInput from './MessageInput';

// // function AiHome() {
// //   const [messages, setMessages] = useState([]);

// //   const handleMessageSubmit = (message) => {
// //     // Add logic here to interact with your backend server
// //     // You'll need to make an API call to send the message and receive the response
// //     // Once you receive the response, update the messages state
// //   };

// //   return (
// //     <div
// //       style={{
// //         display: 'flex',
// //         flexDirection: 'column',
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         height: '100vh',
// //       }}
// //     >
// //       <ChatWindow messages={messages} />
// //       <MessageInput onSubmit={handleMessageSubmit} />
// //     </div>
// //   );
// // }

// // export default AiHome;

// import React, { useState } from 'react';
// import axios from 'axios';

// const AiHome = () => {
//         const [messages, setMessages] = useState([]);
//         const [userInput, setUserInput] = useState('');
    
//         // const sendMessage = async () => {
//         //     try {
//         //         const response = await axios.post('http://localhost:5001/message', { message: userInput });
//         //         setMessages([...messages, { role: 'user', content: userInput }]);
//         //         setMessages([...messages, { role: 'assistant', content: response.data.response }]);
//         //         setUserInput('');
//         //     } catch (error) {
//         //         console.error('Error sending message:', error);
//         //     }
//         // };

//         const sendMessage = async () => {
//             try {
//                 const response = await axios.post('http://localhost:5001/message', { message: userInput });
//                 setMessages(prevMessages => [
//                     ...prevMessages,
//                     { role: 'user', content: userInput },
//                     { role: 'assistant', content: response.data.response }
//                 ]);
//                 setUserInput('');
//             } catch (error) {
//                 console.error('Error sending message:', error);
//             }
//         };
        
    
//         const handleInputChange = (e) => {
//             setUserInput(e.target.value);
//         };
    
//         return (
//             <div>
//                 <div className="chat-container">
//                     {messages.map((message, index) => (
//                         <div key={index} className={`message ${message.role}`}>
//                             {message.content}
//                         </div>
//                     ))}
//                 </div>
//                 <div className="input-container">
//                     <input type="text" value={userInput} onChange={handleInputChange} />
//                     <button onClick={sendMessage}>Send</button>
//                 </div>
//             </div>
//         );
//     };
    

    

// export default AiHome;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import patientImage from './patient.png'; // Importing patient image
import aiBotImage from './ai-bot.jpeg'; // Importing AI bot image
import userImage from './person.jpeg'; // Importing user image

const AiHome = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [typingMessage, setTypingMessage] = useState('');

    useEffect(() => {
        const greetUser = async () => {
            try {
                const response = await axios.post('http://localhost:5001/message', { message: 'start_chat' });
                typeMessage(response.data.response);
            } catch (error) {
                console.error('Error greeting user:', error);
            }
        };

        greetUser();
    }, []);

    const typeMessage = (message) => {
        let index = 0;
        setTypingMessage('');
        const interval = setInterval(() => {
            if (index < message.length) {
                setTypingMessage(prev => prev + message[index]);
                index++;
            } else {
                clearInterval(interval);
                setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: message }]);
                setTypingMessage('');
            }
        }, 50); // Adjust typing speed here
    };

    const sendMessage = async () => {
        try {
            const response = await axios.post('http://localhost:5001/message', { message: userInput });
            setMessages(prevMessages => [...prevMessages, { role: 'user', content: userInput }]);
            setUserInput('');
            typeMessage(response.data.response); // Trigger typing effect for assistant's response
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    return (
        <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
            <div style={{ marginBottom: '30px' }}>
                <h1>Welcome to AI Health Assistant</h1>
                <p>Get personalized health advice and assistance from our AI-powered health assistant.</p>
                <img src={patientImage} alt="Health Assistant Logo" style={{ maxWidth: '200px' }} />
            </div>
            <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                {messages.map((message, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: message.role === 'user' ? 'flex-start' : 'flex-end' }}>
                        {message.role === 'user' && <img src={userImage} alt="User Logo" style={{ maxWidth: '30px', marginRight: '10px' }} />}
                        {message.role === 'assistant' && <img src={aiBotImage} alt="Assistant Logo" style={{ maxWidth: '30px', marginLeft: '10px' }} />}
                        <div style={{
                            backgroundColor: message.role === 'user' ? '#d1e7dd' : '#f5f5f5',
                            padding: '10px',
                            borderRadius: '10px',
                            textAlign: 'left',
                            maxWidth: '70%',
                        }}>
                            {message.content}
                        </div>
                    </div>
                ))}
                {typingMessage && (
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: 'flex-end' }}>
                        <img src={aiBotImage} alt="Assistant Logo" style={{ maxWidth: '30px', marginLeft: '10px' }} />
                        <div style={{
                            backgroundColor: '#f5f5f5',
                            padding: '10px',
                            borderRadius: '10px',
                            textAlign: 'left',
                            maxWidth: '70%',
                        }}>
                            {typingMessage}
                        </div>
                    </div>
                )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <input type="text" value={userInput} onChange={handleInputChange} style={{ flex: '1', padding: '10px', borderRadius: '5px', marginRight: '10px', border: '1px solid #ccc' }} />
                <button onClick={sendMessage} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Send</button>
            </div>
            <p>Powered by AI Health Assistant</p>
            <img src={aiBotImage} alt="AI Logo" style={{ maxWidth: '100px' }} />
        </div>
    );
};

export default AiHome;



