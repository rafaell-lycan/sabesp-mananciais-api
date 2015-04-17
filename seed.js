'use strict';
var moment = require('moment'),
    http   = require('http'),
    debug  = require('debug')('sabesp:seed'),
    today  = moment(),
    start  = moment('2003-01-01'),
    next   = moment('2003-01-01').add(4, 'day');

debug('first crawler with:', start.toString(), next.toString());
seedDatabase(start, next);

setInterval(function() {
  next = next.add(4, 'day');
  debug('next crawler with:', start.toString(), next.toString());
  seedDatabase(start, next);
}, 60 * 1000);

function seedDatabase (firstDay, lastDay) {
  var date = firstDay,
      i = 0;

  while (date <= lastDay) {
    var url = 'http://localhost:8080/' + date.format('YYYY-MM-DD');
    doRequest(url);
    date = date.add(1, 'day');
  }
}

function doRequest(url) {
  http.get(url, function(res) {
    debug("Got response: " + res.statusCode);
  }).on('error', function(e) {
    debug("Got error: " + e.message);
  });
}
