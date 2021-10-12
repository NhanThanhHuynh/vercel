const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 7878;
const auth = require("./Routes/UserRoutes");
const posts = require("./Routes/PostRoutes");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const { connectDB } = require("./src/public/connectDB");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./Controllers/Conversationcontroller");

// io message real-time
io.on("connection", async(socket) => {

  //room,welcome
  await socket.on('join', async({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    await socket.join(user.room);

    socket.emit('message', { text: `Hello ${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  await socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  await socket.on('disconect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});


app.use(express.json());
app.use(cors({credentials: true, origin: true}));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
connectDB();
app.use("/api/auth", auth);
app.use("/api/posts", posts);
server.listen(PORT, console.log(`Server run on ${PORT}`));
