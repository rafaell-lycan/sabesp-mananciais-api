var assert      = require('assert'),
    APIVersions = require('../../lib/APIVersions'),
    response    = {},
    resolve     = {};

resolve._id = "551b395e3bc651ca819d4752";
resolve.date = '2015-03-31';
resolve.dams = [
  {
    "name": "Cantareira",
    "data": [
      {"key": "volume armazenado", "value": "19,0 %"},
      {"key": "pluviometria do dia", "value": "0,2 mm"}
    ]
  },
  {
    "name": "Alto Tietê",
    "data": [
      {"key": "volume armazenado", "value": "22,8 %"},
      {"key": "pluviometria do dia", "value": "0,0 mm"}
    ]
  }
];

describe('APIVersions', function () {
  it('v0', function() {
    response.json = function(data) {
      assert.deepEqual(data[0], {"name":"Cantareira","data":[{"key":"volume armazenado","value":"19,0 %"},{"key":"pluviometria do dia","value":"0,2 mm"}]});
    };
    APIVersions.v0(resolve, response);
  });

  it('v1', function() {
    response.json = function(data) {
      assert.equal(data._id, resolve._id);
      assert.equal(data.date, resolve.date);
      assert.deepEqual(data.dams[0], {"name":"Cantareira","data":[{"key":"volume armazenado","value":"19,0 %"},{"key":"pluviometria do dia","value":"0,2 mm"}]});
    };
    APIVersions.v1(resolve, response);
  });

  it('v2', function() {
    response.json = function(data) {
      assert.deepEqual(data[0], {"name":"Cantareira","data":{"volume_armazenado":"19,0 %","pluviometria_do_dia":"0,2 mm"}});
    };
    APIVersions.v2(resolve, response);
  });

});
