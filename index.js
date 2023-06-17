const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { ObjectId } = require('mongodb');

// Create an instance of Express
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/events', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Event schema and model
const eventSchema = new mongoose.Schema({
  uid: { type: Number, required: true },
  name: { type: String, required: true },
  tagline: { type: String, required: true },
  schedule: { type: Date, required: true },
  description: { type: String, required: true },
  moderator: { type: String, required: true },
  category: { type: String, required: true },
  sub_category: { type: String, required: true },
  rigor_rank: { type: Number, required: true },
  attendees: { type: [Number], default: [] },
});

const Event = mongoose.model('Event', eventSchema);

app.get('/api/v3/app/test', () => {
  console.log("Jay Shree Shyam");
});

// GET /api/v3/app/events?id=:event_id
app.get('/api/v3/app/events', (req, res) => {
  const eventId = req.query.id;
  if (!eventId) {
    return res.status(400).json({ error: 'Event ID is required' });
  }

  Event.findById(eventId)
    .then((event) => {
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.json(event);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// GET /api/v3/app/events?type=latest&limit=5&page=1
app.get('/api/v3/app/events/filters', (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 5;

  Event.find({})
    .sort({ schedule: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .then((events) => {
      res.json(events);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// POST /api/v3/app/events/:id
app.post('/api/v3/app/events/:id', (req, res) => {
  const eventId = req.params.id;

  const {
    name,
    tagline,
    schedule,
    description,
    moderator,
    category,
    sub_category,
    rigor_rank,
  } = req.body;

  const event = new Event({
    uid: 18, // Example user ID
    name,
    tagline,
    schedule: new Date(schedule),
    description,
    moderator,
    category,
    sub_category,
    rigor_rank,
    attendees: [],
  });

  event.save()
    .then((savedEvent) => {
      res.json({ id: savedEvent._id });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// PUT /api/v3/app/events
app.put('/api/v3/app/events', (req, res) => {
  const {
    name,
    tagline,
    schedule,
    description,
    moderator,
    category,
    sub_category,
    rigor_rank,
  } = req.body;

  const update = {
    name,
    tagline,
    schedule: new Date(schedule),
    description,
    moderator,
    category,
    sub_category,
    rigor_rank,
  };

  Event.updateMany({}, update)
    .then(() => {
      res.json({ message: 'Events updated successfully' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// DELETE /api/v3/app/events
app.delete('/api/v3/app/events', (req, res) => {
  Event.deleteMany({})
    .then(() => {
      res.json({ message: 'Events deleted successfully' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
