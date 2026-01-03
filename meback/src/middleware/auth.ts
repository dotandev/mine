import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AdminModel } from '../models/Admin';

interface AuthRequest extends Request {
  admin?: any;
}

export const authenticateAdmin = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      res.status(401).json({ error: 'Access denied. No token provided.' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
    const admin = await AdminModel.findById(decoded.id).select('-password');
    
    if (!admin || !admin.isActive) {
      res.status(401).json({ error: 'Invalid token or inactive admin.' });
      return;
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.admin) {
      res.status(401).json({ error: 'Access denied.' });
      return;
    }

    if (!roles.includes(req.admin.role)) {
      res.status(403).json({ error: 'Insufficient permissions.' });
      return;
    }

    next();
  };
};