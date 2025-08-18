const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
