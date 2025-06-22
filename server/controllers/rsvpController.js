const { EventParticipant } = require('../models');

// RSVP or update RSVP status
exports.rsvpToEvent = async (req, res) => {
  try {
    const { status } = req.body;
    const { eventId } = req.params;
    const userId = req.user.id;

    if (!['going', 'interested', 'not going'].includes(status)) {
      return res.status(400).json({ message: 'Invalid RSVP status' });
    }

    const [rsvp, created] = await EventParticipant.upsert({
      userId,
      eventId,
      status
    });

    res.status(200).json({ message: 'RSVP recorded', rsvp });
  } catch (err) {
    console.error('RSVP Error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get all RSVPs for current user
exports.getMyRSVPs = async (req, res) => {
  try {
    const userId = req.user.id;
    const rsvps = await EventParticipant.findAll({ where: { userId } });

    res.json(rsvps);
  } catch (err) {
    console.error('Fetch RSVP Error:', err);
    res.status(500).json({ error: err.message });
  }
};
