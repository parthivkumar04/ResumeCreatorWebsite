const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    console.error('No token provided');
    return res.status(401).send('Access Denied');
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    console.log('Token verified:', verified); 
    next();
  } catch (err) {
    console.error('Invalid Token:', err.message);
    res.status(400).send('Invalid Token');
  }
};

router.post('/', async (req, res) => {
  try {
    const { email, feedback } = req.body;

    const newFeedback = new Feedback({
      email,
      feedback,
    });

    await newFeedback.save();
    console.log('Feedback document created:', newFeedback);
    res.status(200).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Error submitting feedback' });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  console.log('Request received to fetch all feedbacks');
  try {
    const feedbacks = await Feedback.find();
    console.log(`Number of feedbacks found: ${feedbacks.length}`);
    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
