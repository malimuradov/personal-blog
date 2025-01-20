import { Request, Response } from 'express';
import Post from '../models/post.model';
import User from '../models/user.model';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

interface AuthRequest extends Request {
  user?: any;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

export const createPost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    upload.single('media')(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        console.error('Multer error:', err);
        res.status(400).json({ error: 'File upload error' });
        return;
      } else if (err) {
        console.error('Unknown error:', err);
        res.status(500).json({ error: 'Unknown error occurred' });
        return;
      }

      const { title, content } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      const post = await Post.create({
        title,
        content,
        userId,
        mediaUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
      });

      res.status(201).json(post);
    });
  } catch (error) {
    console.error('Error in createPost:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['id', 'username'] // Only include id and username and hide email and password
        }
      ]
    });
    res.send(posts);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching posts', error: (error as Error).message });
  }
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findByPk(req.params.id, { include: [
      {
        model: User,
        as: 'User',
        attributes: ['id', 'username'] // Only include id and username and hide email and password
      }
    ] });
    if (!post) {
      res.status(404).send({ message: 'Post not found' });
      return;
    }
    res.send(post);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching post', error: (error as Error).message });
  }
};
export const updatePost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!post) {
      res.status(404).send({ message: 'Post not found' });
      return;
    }
    await post.update(req.body);
    res.send(post);
  } catch (error) {
    res.status(400).send({ message: 'Error updating post', error: (error as Error).message });
  }
};

export const deletePost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!post) {
      res.status(404).send({ message: 'Post not found' });
      return;
    }

    if (post.mediaUrl) { // check after deployed
      const filePath = path.join(__dirname, '..', '..', post.mediaUrl.replace('http://localhost:3000', ''));
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }
      });
    }

    await post.destroy();
    res.send({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting post', error: (error as Error).message });
  }
};

