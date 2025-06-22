const { User, Event, Job } = require('../models');

// GET all users (admin-only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ paranoid: false, limit: 100 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { paranoid: false });
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy({ force: true }); // permanent deletion
    res.json({ message: 'User permanently deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, { paranoid: false });
    if (!event) return res.status(404).json({ message: 'Event not found' });

    await event.destroy({ force: true });
    res.json({ message: 'Event permanently deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id, { paranoid: false });
    if (!job) return res.status(404).json({ message: 'Job not found' });

    await job.destroy({ force: true });
    res.json({ message: 'Job permanently deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
