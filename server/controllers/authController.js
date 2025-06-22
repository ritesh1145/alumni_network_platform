const { User } = require('../models');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// Remove sensitive fields like password before sending user info
const sanitizeUser = (user) => {
  const { password, isAdmin, passwordChangedAt, ...safeUser } = user.toJSON();
  return safeUser;
};

// REGISTER
exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = createToken(user);
    res.status(201).json({ token, user: sanitizeUser(user) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.scope('withSensitive').findOne({ where: { email } });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Optional: Update last login timestamp
  user.lastLoginAt = new Date();
  await user.save();

  const token = createToken(user);
  res.json({ token, user: sanitizeUser(user) });
};

// GET PROFILE
exports.getProfile = async (req, res) => {
  res.json(sanitizeUser(req.user));
};
