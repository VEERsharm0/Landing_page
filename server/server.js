const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8084', 'https://4d79d86c1186.ngrok-free.app'],
  credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Drop the old email index if it exists
mongoose.connection.once('open', async () => {
  try {
    await mongoose.connection.db.collection('registrations').dropIndex('email_1');
    console.log('Dropped email_1 index');
  } catch (error) {
    console.log('Index not found or error dropping:', error.message);
  }
});

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const Registration = require('./models/Registration');
    const registration = new Registration(req.body);
    await registration.save();
    res.status(201).json({ message: 'Registration successful', data: registration });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Duplicate entry' });
    } else {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
});

app.put('/api/submit-questionnaire/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { subjective_answers, objective_answers } = req.body;
    const Registration = require('./models/Registration');
    const updatedRegistration = await Registration.findByIdAndUpdate(
      id,
      { subjective_answers, objective_answers },
      { new: true }
    );
    if (!updatedRegistration) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    res.status(200).json({ message: 'Questionnaire submitted successfully', data: updatedRegistration });
  } catch (error) {
    console.error('Questionnaire submission error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
