const { Op } = require('sequelize');
const { User } = require('../models');

// GET /api/users/me
exports.getMe = (req, res) => {
  res.json(req.user);               // req.user already sanitised by default scope
};

// PATCH /api/users/me
exports.updateMe = async (req, res) => {
  try {
    const allowed = [                // only these fields may be updated
      'name', 'bio', 'profilePicture',
      'graduationYear', 'degree', 'currentJob'
    ];
    const updates = {};
    allowed.forEach((key) => {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    });

    const user = await req.user.update(updates);
    res.json(user);
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(400).json({ error: err.message });
  }
};

// GET /api/users/:id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/users
exports.listUsers = async (req, res) => {
  try {
    const { name, degree, year } = req.query;
    const where = {};

    if (name)   where.name  = { [Op.like]: `%${name}%` };
    if (degree) where.degree = { [Op.like]: `%${degree}%` };
    if (year)   where.graduationYear = year;

    const users = await User.findAll({ where, limit: 50 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
