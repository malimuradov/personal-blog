import express from 'express';
import { createPost, getPosts, getPostById, updatePost, deletePost } from '../controllers/post.controller';
import { auth } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', auth, createPost as express.RequestHandler);
router.get('/', getPosts as express.RequestHandler);
router.get('/:id', getPostById as express.RequestHandler);
router.patch('/:id', auth, updatePost as express.RequestHandler);
router.delete('/:id', auth, deletePost as express.RequestHandler);

export default router;

