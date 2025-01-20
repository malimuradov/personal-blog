import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import postRoutes from './routes/post.routes';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

export default app;

