import { RequestHandler } from 'express';
import { verifyToken } from '../utils/auth';

export const authMiddleware: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }

  // Attach user info to request
  (req as any).userId = payload.userId;
  (req as any).phoneNumber = payload.phoneNumber;
  
  next();
};