import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || !(await user.comparePassword(req.body.password))) {
      res.status(401).send({ error: 'Invalid login credentials' });
      return;
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};
