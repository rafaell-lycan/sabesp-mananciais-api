var mongojs = require('mongojs'),
    debug   = require('debug')('sabesp:db'),
    config  = require('config');

/* istanbul ignore next */
'use strict';
var _connection = function(env) {
  var username = env.MONGO_USERNAME || config.get('mongo.username'),
      password = env.MONGO_PASSWORD || config.get('mongo.password'),
      server   = env.MONGO_SERVER   || config.get('mongo.server'),
      port     = env.MONGO_PORT     || config.get('mongo.port'),
      database = env.MONGO_DATABASE || config.get('mongo.database'),

      auth = username ? username + ':' + password + '@' : '';

  return 'mongodb://' + auth + server + ':' + port + '/' + database;
};

var url = _connection(process.env);
debug(url);

var db = mongojs(url);
db.on('error', function(err) {
  debug(err);
});

module.exports = db;
