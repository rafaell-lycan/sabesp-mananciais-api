'use strict';
var moment = require('moment'),
    Mongo   = require('./lib/Mongo'),
    Sabesp  = require('./lib/Sabesp'),
    date = moment('2014-01-01'),
    today = moment().format('YYYY-MM-DD');

Sabesp.getToken().then(seedDatabase);

function seedDatabase (token) {
  var i = 0;
  while (date.format('YYYY-MM-DD') !== today) {
    var currentDate = date.format('YYYY-MM-DD');
    setTimeout(function() {
      isCached(currentDate, token);
    }, 2000 * i);

    date = date.add(1, 'day');
    i++;
  }
}

function isCached (date, token) {
  Mongo.findOne('dams', { date: date }, function(err, result) {
      if (!result) {
        insertData(date, token);
      }
  });
}

function insertData (date, token) {
  Sabesp.fetch(date, token).then(function(data) {
    Mongo.insert('dams', data, function(err, result) {
      console.log(err, result);
    });
  });
}