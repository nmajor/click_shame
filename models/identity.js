var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var identitySchema = new Schema({
  source     : String,
});

module.exports = mongoose.model('Identity', identitySchema);