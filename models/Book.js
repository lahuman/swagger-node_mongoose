const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Book = new Schema({
  title: {type: String, require: true, index: true},
  write: {type: String, require: true, index: true},
  price: {type: String, require: true, index: true}
}, { timestamps: true });


module.exports = mongoose.model('Book', Book);
