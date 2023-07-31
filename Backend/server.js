import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './Routes/userRouter.js';
import adminRouter from './Routes/adminRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

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
app.use('/', adminRouter);

app.listen(PORT, () => console.log('Server listening on port', PORT));
