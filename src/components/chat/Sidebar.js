// import React from 'react';
// import './chat.css';

// function Sidebar({ users, username, setCurrentRecipient }) {
//   return (
//     <div className="sidebar">
//       <div className="sidebar-header">
//         <h2>Contacts</h2>
//       </div>
//       <div className="user-list">
//         {users.map((user) => (
//           user !== username && (
//             <div key={user} className="user-item" onClick={() => setCurrentRecipient(user)}>
//               {user}
//             </div>
//           )
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Sidebar;


// function Sidebar({ users, username, setCurrentRecipient, unreadMessages }) {
//   return (
//     <div className="sidebar">
//       <h3>Users</h3>
//       <ul>
//         {users.map((user) => (
//           user !== username && (
//             <li key={user} onClick={() => setCurrentRecipient(user)}>
//               {user}
//               {unreadMessages[user] > 0 && (
//                 <span className="notification">{unreadMessages[user]}</span>
//               )}
//             </li>
//           )
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Sidebar;

import React from 'react';

const Sidebar = ({ users, username, setCurrentRecipient, unreadMessages }) => {
  return (
    <div style={styles.sidebar}>
      <ul style={styles.userList}>
        {users.map((user, index) => (
          <li
            key={index}
            onClick={() => setCurrentRecipient(user)}
            style={{
              ...styles.userListItem,
              backgroundColor: unreadMessages[user] ? '#007bff' : '',
              color: unreadMessages[user] ? 'white' : '',
            }}
          >
            {user} {unreadMessages[user] ? `(${unreadMessages[user]})` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '250px',
    backgroundColor: '#f7f7f7',
    borderRight: '1px solid #ccc',
    padding: '10px',
  },
  userList: {
    listStyleType: 'none',
    padding: '0',
  },
  userListItem: {
    padding: '10px',
    cursor: 'pointer',
    borderBottom: '1px solid #ccc',
  },
};

export default Sidebar;

