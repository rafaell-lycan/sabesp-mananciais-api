[![Build Status](https://travis-ci.org/rafaell-lycan/sabesp-mananciais-api.svg?branch=master)](https://travis-ci.org/rafaell-lycan/sabesp-mananciais-api)
[![node](https://img.shields.io/badge/node-0.12.3-brightgreen.svg)]()
[![Code Climate](https://codeclimate.com/github/rafaell-lycan/sabesp-mananciais-api/badges/gpa.svg)](https://codeclimate.com/github/rafaell-lycan/sabesp-mananciais-api)
[![GitHub release](https://img.shields.io/github/release/rafaell-lycan/sabesp-mananciais-api.svg)]()
[![License](https://img.shields.io/:license-mit-blue.svg)](https://github.com/rafaell-lycan/sabesp-mananciais-api/blob/master/LICENSE)

# Sabesp Mananciais API

A simple scraping application to visualize data about water in São Paulo.

## Development

### Setup

1. Clone the repository

    ```
    git clone https://github.com/rafaell-lycan/sabesp-mananciais-api.git
    ```

2. Install dependencies

    ```bash
    cd sabesp-mananciais-api
    yarn
    ```

3. Start the dev server

    ```bash
    yarn develop
    ```

4. You can now access it on http://localhost:3000.

### Testing

#### Run unit tests

```bash
yarn test
```

## Usage

### Available routes

| Description                | Method | URL         | Params     |
| -------------------------- | ------ | ----------- | ---------- |
| Get data of today          | GET    | `/`         | NULL       |
| Get data of a specific day | GET    | `/:date`    | YYYY-MM-DD |
| Get data of today          | GET    | `/v2`       | NULL       |
| Get data of a specific day | GET    | `/v2/:date` | YYYY-MM-DD |

#### ⚠️ Important ⚠️

It isn't possible get data before **January 1th, 2003** or **future**.

### Response format at `/`

```json
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

### Response format at `/v2` (Simple way to serialize JSON data)

Thank you @[wcastello](https://github.com/wcastello) for the suggestion.

```json
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

| [![Rafaell Lycan](https://avatars2.githubusercontent.com/u/1516450?v=3&s=70)](https://rafaell-lycan.com) | [![William Bruno](https://avatars2.githubusercontent.com/u/1443932?v=3&s=70)](http://wbruno.com.br) |
| ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [Rafaell Lycan](http://rafaell-lycan.github.io)                                                               | [William Bruno](http://wbruno.com.br)                                                               |
