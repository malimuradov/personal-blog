import express from 'express';
import { register, login } from '../controllers/user.controller';

const router = express.Router();

router.post('/register', register as express.RequestHandler);
router.post('/login', login as express.RequestHandler);

export default router;
