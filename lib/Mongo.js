var mongojs = require('mongojs'),
    debug   = require('debug')('sabesp:db'),
    config  = require('config');

/* istanbul ignore next */
var Mongo = (function() {
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

  var db;
  var module = {
    _init: function() {
      var url = _connection(process.env);
      db = mongojs(url);
    },

    findOne: function(collection, query, callback) {
      db.collection(collection).findOne(query, callback);
    },

    insert: function(collection, data, callback) {
      db.collection(collection).insert(data, callback);
    }
  };
  module._init();

  return module;
}());

module.exports = Mongo;
