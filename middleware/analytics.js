'use strict';
var config  = require('config'),
    debug   = require('debug')('sabesp:middleware'),
    ua      = require('universal-analytics');

var Analytics = {
  visitor : ua(process.env.ANALYTICS || config.get('analytics')),
  track : function (req, res, next) {
    var options = {
      dh: req.headers.host,
      dp: req.path,
      uip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'],
      ua: req.headers['user-agent']
    }
    Analytics.visitor.pageview(options).send();
    next();
  }
};

module.exports = Analytics;