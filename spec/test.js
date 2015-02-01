process.env.NODE_ENV = 'test';

var request = require('supertest'),
    express = require('express');

var app = require('../app.js');

describe('GET', function(){
  it('responds with a json success message', function(done){
    request(app)
    .get('/strikes')
    .set('Accept', 'application/json')
    .send()
    .expect(200, done);
  });
});

describe('POST', function(){
  it('responds with a json success message', function(done){
    request(app)
    .get('/strikes')
    .set('Accept', 'application/json')
    .send()
    .expect(200, done);
  });
});