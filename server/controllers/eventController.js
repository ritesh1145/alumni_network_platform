const { Event } = require('../models');

// CREATE Event
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      createdBy: req.user.id // 🔒 Attach event to logged-in user
    });
    res.status(201).json(event);
  } catch (err) {
    console.error('Event Creation Error:', err);
    res.status(400).json({ error: err.message });
  }
};

// GET All Events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (err) {
    console.error('Fetch Events Error:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET Event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    console.error('Fetch Event Error:', err);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // 🔒 Only creator or admin can update
    if (event.createdBy !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized to update this event' });
    }

    await event.update(req.body);
    res.json(event);
  } catch (err) {
    console.error('Update Event Error:', err);
    res.status(400).json({ error: err.message });
  }
};

// DELETE Event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // 🔒 Only creator or admin can delete
    if (event.createdBy !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized to delete this event' });
    }

    await event.destroy();
    res.json({ message: 'Event deleted' });
  } catch (err) {
    console.error('Delete Event Error:', err);
    res.status(500).json({ error: err.message });
  }
};
