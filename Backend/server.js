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

app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/matchmaker')
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log(err, 'Database Error');
  });

app.use('/', userRouter);
app.use('/admin', adminRouter);

const server = app.listen(PORT, () => console.log('Server listening on port', PORT));


// This code creates a new instance of a Server object from the socket.io library
const io = new Server(server, {
  pingTimeout: 3000,
   cors: {
    origin: "http://localhost:3000",
   },
});

io.on('connection', (socket)=> {
  console.log("connected to socket.io");

  socket.on('setup', (userData)=> {
    socket.join(userData);
  });

  socket.on('join chat', (room)=> {
    socket.join(room);
    console.log("user joined room "+ room);
  });

  socket.on('new message', (newMessageRecieved)=> {
    console.log(newMessageRecieved.content,"new Message")
    const chat = newMessageRecieved.chat;

    // console.log("Chat ID:", chat);

    if(!chat.users) return console.log("chat.user is not defined");

    chat.users.forEach(user => {
      // console.log(newMessageRecieved.sender._id,"id hereeeee", user)
      if(user == newMessageRecieved.sender._id) return
      socket.in(user).emit("message received", newMessageRecieved)
    })
  })

})
