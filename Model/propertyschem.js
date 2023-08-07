// propertySchema.js
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  price: Number,
  mobileNo: String,
  location: String,
  imageUrl: String,
});

// Export the model
module.exports = mongoose.model('Property', propertySchema);
