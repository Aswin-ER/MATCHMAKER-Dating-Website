import express from 'express';
import nocache from 'nocache';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './Routes/userRouter.js';
import adminRouter from './Routes/adminRouter.js';
import { Server } from "socket.io";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(nocache());
app.use(express.json({
  limit: '30mb'
}));



// app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-Content-Length');
  next();
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log(err, 'Database Error');
  });

app.use('/', userRouter);
app.use('/admin', adminRouter);

const server = app.listen(PORT, () => console.log('Server listening on port', PORT));

const io = new Server(server, {
  pingTimeout: 3000,
  cors: {
    origin: "https://makermatch.online",
  },
});

io.on('connection', (socket) => {
  console.log("User connected to socket.io");

  socket.on('setup', (userData) => {
    // console.log(userData,"userdata");
    const roomName = userData;
    socket.join(roomName);
  });


  socket.on('join chat', (room) => {
    if (socket.room) {
      socket.disconnect(socket.room);
      console.log("disconnect room", socket.room);
    }
    socket.join(room);
    socket.room = room;
    console.log("User joined room " + room);
  });

  socket.on('new message', (newMessageReceived) => {
    const chat = newMessageReceived.chat;

    if (!chat.users) {
      console.log("chat.users is not defined");
      return;
    }

    chat.users.forEach(user => {
      // console.log(user,"user")
      if (user === newMessageReceived.sender._id) return
        socket.to(user).emit("message received", newMessageReceived);
    });
  });

});
