const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const connectDB = require('./db');
const feedbackRoutes = require('./routes/feedbackRoutes');
const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes');
const User = require('./models/User');
const Image = require('./models/Image');
require('dotenv').config(); 

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uploadsDir = path.join(__dirname, 'db1/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Uploads directory created');
}

app.use('/db1/uploads', express.static(uploadsDir));

app.use('/api/feedback', feedbackRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', imageRoutes);

app.get('/api/auth/profile', async (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    const user = await User.findById(req.user.id);
    const image = await Image.findOne({ email: user.email });
    const profileData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      rank: user.rank,
      imagePath: image ? image.path : null,
    };
    res.json(profileData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile data' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
