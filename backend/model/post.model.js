var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const postSchema = mongoose.Schema({
  title: { type: String},
  content: { type: String}
});

module.exports = mongoose.model('Post', postSchema);
