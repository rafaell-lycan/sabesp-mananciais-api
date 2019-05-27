# Sabesp Mananciais API
A simple scraping application to visualize data about water in São Paulo.

[![Build Status](https://travis-ci.org/rafaell-lycan/sabesp-mananciais-api.svg?branch=master)](https://travis-ci.org/rafaell-lycan/sabesp-mananciais-api)
[![node](https://img.shields.io/badge/node-0.12.3-brightgreen.svg)]()
[![Code Climate](https://codeclimate.com/github/rafaell-lycan/sabesp-mananciais-api/badges/gpa.svg)](https://codeclimate.com/github/rafaell-lycan/sabesp-mananciais-api)
[![GitHub release](https://img.shields.io/github/release/rafaell-lycan/sabesp-mananciais-api.svg)]()
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/rafaell-lycan/sabesp-mananciais-api/blob/master/LICENSE)


## A little bit about the technology envolve in this project:
- Node.js 0.12.3
- Bluebird 2.9.24
- Cheerio 0.18.0
- config 1.12.0
- Cors 2.6.0
- debug 2.1.3
- Express 4.11.2
- Moment 2.10.2
- Mongojs 0.18.2
- Newrelic 1.18.3
- Request 2.55.0
- Universal-Analytics 0.3.8


## Dev Dependencies:
- Istanbul 0.3.5
- JSHint 2.6.0
- Mocha 2.1.0
- Nodemon 1.3.6
- Supertest 0.15.0

## Tests
```
$ npm test         # unit tests
$ npm run test-api # integration tests (with database)
```

## Route Schema:
| Description                | Method | URL         | Params     |
| -------------------------- | ------ | ----------- | ---------- |
| Get data of today          | GET    | `/`         | NULL       |
| Get data of a specific day | GET    | `/:date`    | YYYY-MM-DD |
| Get data of today          | GET    | `/v2`       | NULL       |
| Get data of a specific day | GET    | `/v2/:date` | YYYY-MM-DD |

## v0
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

## v2 (Simple way to serialize JSON data)
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

## Team

Sabesp API was made with love and a lot of JavaScript by these guys:

| [![Rafaell Lycan](https://avatars2.githubusercontent.com/u/1516450?v=3&s=70)](http://rafaell-lycan.github.io) | [![William Bruno](https://avatars2.githubusercontent.com/u/1443932?v=3&s=70)](http://wbruno.com.br) |
| ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [Rafaell Lycan](http://rafaell-lycan.github.io)                                                               | [William Bruno](http://wbruno.com.br)                                                               |

## OBS:
It isn't possible get data before January 1th, 2003.

## TODO:

[x] Fix crawler bug by using Sabesp official API.
[x] Change project to typescript
[x] Add Swagger
[ ] Change Unit Tests
[ ] Cache information on Redis
[ ] Update readme
