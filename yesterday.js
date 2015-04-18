'use strict';
var moment    = require('moment'),
    debug     = require('debug')('sabesp:seed'),
    yesterday = moment().subtract(1, 'day'),
    request   = require('request');

debug('Job: Seed yesterday');
var url = 'http://localhost:8080/' + yesterday.format('YYYY-MM-DD');
doRequest(url);

function doRequest(url) {
  request(url, function (error, response, body) {
    debug('Job: Seed yesterday');
    if (error) {
      debug(error);
    }
  });
}
