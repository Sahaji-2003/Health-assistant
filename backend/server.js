// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"]
//     }
// });

// app.use(cors());
// app.use(express.json());

// const User = mongoose.model('User', new mongoose.Schema({
//     username: { type: String, unique: true },
//     password: String
// }));

// mongoose.connect('mongodb+srv://SigmaMS:Sigma%40123@cluster0.gsa79xn.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// app.post('/register', async (req, res) => {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     try {
//         const user = new User({ username, password: hashedPassword });
//         await user.save();
//         res.status(201).send('User registered');
//     } catch (error) {
//         res.status(400).send('Error registering user');
//     }
// });

// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (user && await bcrypt.compare(password, user.password)) {
//         const token = jwt.sign({ username: user.username }, 'c7b6864e551461a267fe0c9b2863a2e0841a4042f3a37dbc5ff1feb1a2bcb795b251c3968dc89fff86846dd6d26832da1464a41fdf3aa5dbc3bffbb0b0de4db9');
//         res.json({ token });
//     } else {
//         res.status(400).send('Invalid credentials');
//     }
// });

// const authenticate = (req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) return res.status(401).send('Access denied');

//     try {
//         const decoded = jwt.verify(token, 'c7b6864e551461a267fe0c9b2863a2e0841a4042f3a37dbc5ff1feb1a2bcb795b251c3968dc89fff86846dd6d26832da1464a41fdf3aa5dbc3bffbb0b0de4db9');
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(400).send('Invalid token');
//     }
// };

// let users = {};

// io.on('connection', (socket) => {
//     socket.on('register', (username) => {
//         users[username] = socket.id;
//         socket.username = username;
//         io.emit('userList', Object.keys(users));
//     });

//     socket.on('private message', ({ recipient, message }) => {
//         const recipientSocketId = users[recipient];
//         if (recipientSocketId) {
//             io.to(recipientSocketId).emit('private message', {
//                 sender: socket.username,
//                 message
//             });
//         }
//     });

//     socket.on('disconnect', () => {
//         delete users[socket.username];
//         io.emit('userList', Object.keys(users));
//     });
// });

// const PORT = process.env.PORT || 4000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));




const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
// const io = socketIo(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"]
//     }
// });

const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    },
  });
app.use(cors());
app.use(express.json());

const User = mongoose.model('UserChat', new mongoose.Schema({
    username: { type: String, unique: true },
    password: String
}));

mongoose.connect('mongodb+srv://SigmaMS:Sigma%40123@cluster0.gsa79xn.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(400).send('Error registering user');
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
        res.json({ token });
    } else {
        res.status(400).send('Invalid credentials');
    }
});

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
};

  
  let users = {};
  
  io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('register', (username) => {
      socket.username = username;
      users[username] = socket.id;
      io.emit('userList', Object.keys(users));
    });
  
    socket.on('private message', ({ recipient, message }) => {
      const recipientSocketId = users[recipient];
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('private message', {
          sender: socket.username,
          recipient,
          message,
        });
      }
    });
  
    socket.on('disconnect', () => {
      for (let username in users) {
        if (users[username] === socket.id) {
          delete users[username];
          break;
        }
      }
      io.emit('userList', Object.keys(users));
      console.log('user disconnected');
    });
  });
  



  
//   let users = {};
  
//   io.on('connection', (socket) => {
//     console.log('a user connected');
  
//     socket.on('register', (username) => {
//       users[username] = socket.id;
//       io.emit('userList', Object.keys(users));
//     });
  
//     socket.on('private message', ({ recipient, message }) => {
//       const recipientSocketId = users[recipient];
//       if (recipientSocketId) {
//         io.to(recipientSocketId).emit('private message', {
//           sender: socket.username,
//           recipient,
//           message,
//         });
//       }
//     });
  
//     socket.on('disconnect', () => {
//       for (let username in users) {
//         if (users[username] === socket.id) {
//           delete users[username];
//           break;
//         }
//       }
//       io.emit('userList', Object.keys(users));
//       console.log('user disconnected');
//     });
//   });
  
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
