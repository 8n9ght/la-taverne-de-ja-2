const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  ingredients: {
      type: [String],
      required: true
  },
  status: {
    type: String,
    required: false
  },
  client: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Order', orderSchema);
