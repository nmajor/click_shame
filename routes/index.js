var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Get all standings
router.get('/standings', function(req, res, next) {
  var string_formatter = req.app.locals.string_formatter();
  var url = req.app.locals.url;
  var db = req.db;
  var collection = db.get('standings');
  var domain_list = req.body;

  if ( domain_list === '' ) {
    collection.find({},["-_id", "-created_at", "-updated_at"],function(e,standings){
      res.json(standings);
    });
  } else {
    collection.find(domain_list, ["-_id", "-created_at", "-updated_at"], function (err, doc) {
      res.json(doc);
    });
  }
});

// Get URLS
router.get('/urls', function(req, res, next) {
  var string_formatter = req.app.locals.string_formatter();
  var application_helper = req.app.locals.application_helper();
  var db = req.db;
  var standings_collection = db.get('standings');
  var strikes_collection = db.get('standings');
  var url_list = req.body;
  var data = [];

  res.json(data);
});

// Get all strikes
router.get('/strikes', function(req, res, next) {
  var db = req.db;
  var collection = db.get('strikes');

  collection.find({},{},function(e,strikes){
    res.json(strikes);
  });
});

// Create strike
router.post('/strikes', function(req, res, next) {
  var string_formatter = req.app.locals.string_formatter();
  var url = req.app.locals.url;
  var db = req.db;
  var now = (new Date()).getTime();

  var strike = req.body;
  strike.domain = string_formatter.stripWww(url.parse(strike.url).hostname);
  strike.full_url = strike.url;
  strike.url = string_formatter.stripUrl(strike.url);

  // Set our collection
  var strikes = db.get('strikes');

  if ( strike.domain === null || strike.domain === "null" || strike.domain.length < 1 ) { return; }
  // Submit to the DB
  strikes.insert({
    "domain" : strike.domain,
    "url" : strike.url,
    "full_url" : strike.full_url,
    "created_at" : now,
  }, function (err, doc) {
    if (err) {
      res.json({"error":"There was a problem adding the information to the database."});
    }
    else {
      var standings = db.get('standings');
      var domain_strikes;
      strikes.find({ domain: strike.domain }, function (err, doc) {
        domain_strikes = doc.length;
        standings.find({ domain: strike.domain }, function (err, doc) {
          if (doc.length === 0) {
            standings.insert({
              "domain" : strike.domain,
              "score" : domain_strikes,
              "created_at" : now,
              "updated_at" : now,
            }, function (err, doc) { res.json(strike); });
          } else {
            standings.update({ "domain" : strike.domain }, { $set: { "domain" : strike.domain, "score" : domain_strikes, "updated_at" : now } }, function (err, doc) { res.json(strike); });
          }
        });
      });


    }
  });
});

module.exports = router;