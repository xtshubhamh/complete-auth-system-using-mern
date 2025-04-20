import User from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js';

// @desc Register user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ name, email, password });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// @desc Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// @desc Logout
export const logoutUser = (req, res) => {
  res.clearCookie('jwt').json({ message: 'Logged out' });
};

// @desc Get Profile
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
