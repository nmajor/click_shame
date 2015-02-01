var express = require('express');
var router = express.Router();

var Strike  =  require('../models/strike');
var Domain  = require('../models/domain');
var Reference  = require('../models/reference');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Ger specific domain
router.get('/domains/:domain', function(req, res, next) {
  var string_formatter = req.app.locals.string_formatter();
  Domain.findOne({name: string_formatter.stripWww(req.params.domain)}, function (err, doc) {
    doc = doc.toObject();
    doc.domain = req.params.domain;
    res.json(doc);
  });
});

// Get all domains
router.get('/domains', function(req, res, next) {
  console.log("list");
  // if (  Object.prototype.toString.call( list ) === '[object Array]'  ) {
  Domain.find({}, function (err, docs) {
    res.json(docs);
  });
});

// Ger specific reference
router.get('/references/:reference', function(req, res, next) {
  var string_formatter = req.app.locals.string_formatter();
  Reference.findOne({address: string_formatter.stripUrl(req.params.address)}, function (err, doc) {
    doc = doc.toObject();
    doc.reference = req.params.address;
    res.json(doc);
  });
});

// Get all references
router.get('/references', function(req, res, next) {
  Reference.find({}, function (err, docs) {
    res.json(docs);
  });
});

// Get all strikes
router.get('/strikes', function(req, res, next) {
  Strike.find({}, function (err, docs) {
    res.json(docs);
  });
});

// Create strike
router.post('/strikes', function(req, res, next) {
  var string_formatter = req.app.locals.string_formatter();
  strike = new Strike({
    full_address: req.body.address,
    address: string_formatter.stripUrl(req.body.address),
    domain_name: string_formatter.getDomainFromAddress(req.body.address),
    created_at: new Date()
  });
  strike.save(function (err, doc) {
    if (err) console.log(err);
    strike.create_or_update_relationships();
    res.json(doc);
  });
});

module.exports = router;