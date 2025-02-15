import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/authUtils.js';

const register = async (userData) => {

    if (userData.password !== userData.confirmPassword) {
        throw new Error('Password missmatch!');
    }

    const user = await User.findOne({ email: userData.email }).select({ _id: true });

    if (user) {
        throw new Error('User already exists');
    }

    const createdUser = await User.create(userData);
    return generateToken(createdUser);
}

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password!');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw new Error('Invalid email or password!');
    }

    return generateToken(user);
}

const authService = {
    register,
    login
};

export default authService;