var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var domainSchema = new Schema({
  name      : String,
  score      : Number
});

module.exports = mongoose.model('Domain', domainSchema);