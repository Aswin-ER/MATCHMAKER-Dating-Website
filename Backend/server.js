const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const userRouter = require('./Routes/userRouter');



const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://127.0.0.1:27017/matchmaker').then(()=> {
    console.log('Database connected');
}).catch((err)=> {
    console.log(err, 'Database Error');
});

app.use('/', userRouter);

app.listen(PORT, ()=> console.log('Server listing on port', PORT));
