import express from 'express';
import cors from 'cors';
import routes from '../routes/index.js';
import ErrorHandler from '../middlewares/error.js';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(routes);
app.use(ErrorHandler);


export default app;