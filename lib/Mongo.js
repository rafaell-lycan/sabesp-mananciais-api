var MongoClient = require('mongodb').MongoClient,
    config      = require('config');

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

  var module = {
    _init: function(callback) {
      var url = _connection(process.env);

      MongoClient.connect(url, callback);
    },

    findOne: function(collection, query, callback) {
      module._init(function(err, db) {
        if (db) {
          db.collection(collection).findOne(query, callback);
        } else {
          callback(err);
        }
      });
    },

    insert: function(collection, data, callback) {
      module._init(function(err, db) {
        if (db) {
          db.collection(collection).insert(data, callback);
        } else {
          callback(err);
        }
      });
    }
  };

  return module;
}());

module.exports = Mongo;
