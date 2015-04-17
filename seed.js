'use strict';
var moment    = require('moment'),
    http      = require('http'),
    debug     = require('debug')('sabesp:seed'),
    yesterday = moment().subtract(1, 'day'),
    request   = require('request'),
    start     = moment('2015-04-01'),
    next      = moment('2015-04-01').add(30, 'day'),
    itv;

seedDatabase(start, next);

itv = setInterval(function() {
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

    if (date >= yesterday) {
      clearInterval(itv);
      break;
    }
  }
}

function doRequest(url) {
  request(url, function (error, response, body) {
    if (error) {
      debug(error);
    }
  })
}
