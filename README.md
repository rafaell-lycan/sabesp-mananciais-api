# Sabesp Mananciais API
A simple scraping application to visualize data about water in São Paulo.

[![Build Status](https://travis-ci.org/rafaell-lycan/sabesp-mananciais-api.svg?branch=master)](https://travis-ci.org/rafaell-lycan/sabesp-mananciais-api)
[![node](https://img.shields.io/badge/node-0.10.x-brightgreen.svg)]()
[![Code Climate](https://codeclimate.com/github/rafaell-lycan/sabesp-mananciais-api/badges/gpa.svg)](https://codeclimate.com/github/rafaell-lycan/sabesp-mananciais-api)
[![GitHub release](https://img.shields.io/github/release/rafaell-lycan/sabesp-mananciais-api.svg)]()
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/rafaell-lycan/sabesp-mananciais-api/blob/master/LICENSE)


## A little bit about the technology envolve in this project:
- Node.js 0.10.x
- Express 4.11.2
- Request 2.53.0
- Cheerio 0.18.0
- Promise 6.1.0
- MongoDB 2.6.7


## Dev Dependencies:
- Nodemon 1.3.6
- JSHint 2.6.0
- Mocha 2.1.0
- Supertest 0.15.0
- Istanbul 0.3.5


## Tests
```
$ npm test         # unit tests
$ npm run test-api # integration tests (with database)
```

## Route Schema:
Description                | Method | URL         | Params
---------------------------| ------ | ----------- | ---------
Get data of today          | GET    | `/`         | NULL
Get data of a specific day | GET    | `/:date`    | YYYY-MM-DD
Get data of today          | GET    | `/v1`       | NULL
Get data of a specific day | GET    | `/v1/:date` | YYYY-MM-DD
Get data of today          | GET    | `/v2`       | NULL
Get data of a specific day | GET    | `/v2/:date` | YYYY-MM-DD

### v0
```
[
  {
    "name": "Cantareira",
    "data": [
      {"key": "volume armazenado", "value": "7,2 %"},
      {"key": "pluviometria do dia", "value": "0,0 mm"},
      {"key": "pluviometria acumulada no mês", "value": "0,0 mm"},
      {"key": "média histórica do mês", "value": "271,1 mm"} ]
  },
  //...
]
```

### v1
```
{
  "_id": "551b395e3bc651ca819d4752",
  "date": "2015-03-31",
  "dams": [
  {
    "name": "Cantareira",
    "data": [
      {"key": "volume armazenado", "value": "19,0 %"},
      {"key": "pluviometria do dia", "value": "0,2 mm"},
      {"key": "pluviometria acumulada no mês", "value": "206,5 mm"},
      {"key": "média histórica do mês", "value": "178,0 mm"}
    ]
  },
//..
]
```

### v2
@[wcastello](https://github.com/wcastello) suggestion:
```
[
  {
    "name": "Cantareira",
    "data": {
      "volume_armazenado": "19,0 %",
      "pluviometria_do_dia": "0,2 mm",
      "pluviometria_acumulada_no_mes": "206,5 mm",
      "media_historica_do_mes": "178,0 mm"
    }
  },
  //...
]
```

## OBS:
It isn't possible get data before January 1th, 2003.
