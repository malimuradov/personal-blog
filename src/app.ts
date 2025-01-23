import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import postRoutes from './routes/post.routes';
import path from 'path';

const app = express();

// Increase JSON payload size limit
app.use(express.json({ limit: '50mb' }));
// Increase URL-encoded payload size limit
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

export default app;

