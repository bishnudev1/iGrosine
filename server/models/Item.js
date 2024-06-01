const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },  
  id: {
    type: Number,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  seller: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  realPrice: {
    type: String,
    required: true
  },
  off: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  reviews: [
    {
        type: Object,
        default: {}
    }
  ]
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
