const mongoose = require('mongoose');
const wordSchema = new mongoose.Schema({
  word: String,
  meaning: String,
  example: String,
  dateAdded: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Word', wordSchema);
