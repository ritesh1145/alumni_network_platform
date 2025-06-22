const { Job, User } = require('../models');

// Create a new job
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      postedBy: req.user.id,
    });
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      include: {
        model: User,
        as: 'poster',
        attributes: ['id', 'name', 'email', 'currentJob'],
      },
      order: [['createdAt', 'DESC']],
    });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id, {
      include: {
        model: User,
        as: 'poster',
        attributes: ['id', 'name', 'email', 'currentJob'],
      },
    });

    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.postedBy !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    await job.update(req.body);
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.postedBy !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await job.destroy();
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
