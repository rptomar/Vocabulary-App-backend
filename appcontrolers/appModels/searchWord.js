const mongoose = require('mongoose');
const wordSchema = new mongoose.Schema({
  //Used schema for store data in mongodb database by validating parameters
  word: String,
  meaning: String,
  example: String,
  //use date from my side for adding data on unique date 
  dateAdded: { type: Date, default: Date.now },
});
//export the schema
module.exports = mongoose.model('Word', wordSchema);
