import express from 'express';
import nocache from 'nocache';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './Routes/userRouter.js';
import adminRouter from './Routes/adminRouter.js';
import chatRouter from './Routes/chatRouter.js';
import messageRouter from './Routes/messageRouter.js';

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
app.use('/chat', chatRouter);
app.use('/message', messageRouter);

app.listen(PORT, () => console.log('Server listening on port', PORT));
