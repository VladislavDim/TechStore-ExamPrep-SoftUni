import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        username: user.username
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
}