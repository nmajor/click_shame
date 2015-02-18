var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var referenceSchema = new Schema({
  _domain    : { type: ObjectId, ref: 'Domain' },
  address    : String,
  score      : Number
});

module.exports = mongoose.model('Reference', referenceSchema);