import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

import connectDB from './config/db.js';
import todoRoute from './routes/todoRoute.js';

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*', // Allow all origins by default
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
}));


app.use('/api/todo', todoRoute);

app.listen(PORT, () => {
    connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
