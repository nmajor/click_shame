var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var referenceSchema = new Schema({
  domain     : { type: ObjectId, ref: 'Domain' },
  address    : String,
  score      : Number
});

referenceSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

module.exports = mongoose.model('Reference', referenceSchema);