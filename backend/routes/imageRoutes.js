const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Image = require('../models/Image');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'db1/uploads/'; 
    console.log('Saving to directory:', dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + '-' + file.originalname;
    console.log('Saving file as:', filename);
    cb(null, filename);
  },
});

const upload = multer({ storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { email } = req.body;

    const existingImage = await Image.findOne({ email });

    if (existingImage) {
      
      const existingImagePath = path.join(__dirname, '..', existingImage.imagePath);
      fs.unlink(existingImagePath, (err) => {
        if (err) {
          console.error('Error deleting existing image:', err);
        } else {
          console.log('Existing image deleted:', existingImagePath);
        }
      });

      await Image.deleteOne({ email });
    }

    const imagePath = req.file.path;
    console.log('File saved at:', imagePath);

    const newImage = new Image({
      email,
      imagePath,
    });

    await newImage.save();
    res.status(200).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/images/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const image = await Image.findOne({ email });

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    console.log('Fetching image from:', image.imagePath);
    res.status(200).json({ imagePath: image.imagePath });
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
