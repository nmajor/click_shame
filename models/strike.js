var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var strikeSchema = new Schema({
  _domain       : { type: ObjectId, ref: 'Domain' },
  _reference    : { type: ObjectId, ref: 'Reference' },
  domain_name  : String,
  address      : String,
  full_address : String
});

strikeSchema.methods.create_or_update_relationships = function create_or_update_relationships(callback) {
  this.create_or_update_domain();
};

strikeSchema.methods.create_or_update_domain = function create_or_update_domain(callback) {
  var Domain  = require('../models/domain');
  var Strike  = require('../models/strike');
  strike = this;

  strike.model('Strike').count({domain_name: strike.domain_name}, function(err, count){
    Domain.update({name: strike.domain_name}, {score: count}, {upsert: true}, function(err, d){
      Strike.update({_id: strike._id}, {domain: d._id}, {});
      strike.create_or_update_reference();
    });
  });

};

strikeSchema.methods.create_or_update_reference = function create_or_update_reference(callback) {
  var Domain  = require('../models/domain');
  var Reference  = require('../models/reference');
  var Strike  = require('../models/strike');
  strike = this;

  strike.model('Strike').count({address: strike.address}, function(err, count){
    Domain.findOne({name: strike.domain_name}, function(err, domain){
      Reference.update({address: strike.address}, {score: count, domain: domain._id}, {upsert: true}, function(err, r){
        Strike.update({_id: strike._id}, {reference: r._id}, {}, function(){

        });
      });
    });
  });

};

module.exports = mongoose.model('Strike', strikeSchema);