'use strict';
var moment  = require('moment'),
    http    = require('http'),
    debug   = require('debug')('sabesp:seed'),
    today   = moment(),
    request = require('request'),
    start   = moment('2003-01-01'),
    next    = moment('2003-01-01').add(30, 'day');

seedDatabase(start, next);

setInterval(function() {
  next = next.add(30, 'day');
  seedDatabase(start, next);
}, 3 * 1000);

function seedDatabase (firstDay, lastDay) {
  debug('next crawler with:', firstDay.toString(), lastDay.toString());
  var date = firstDay,
      i = 0;

  while (date <= lastDay) {
    var url = 'http://localhost:8080/' + date.format('YYYY-MM-DD');
    doRequest(url);
    date = date.add(1, 'day');
  }
}

function doRequest(url) {
  request(url, function (error, response, body) {
    if (error) {
      debug(error);
    }
  })
}
