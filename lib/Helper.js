(function (){
  var cheerio = require('cheerio');

  var Helper = {
    json: [],
    data: {},
    $ : null,
    dams : {}
  };

  Helper.getDamName = function (str) {
    var name = str.split(/[./]+/)[1];
    return Helper.dams[name];
  };

  Helper.buildJSON = function (cssSelector, key) {
    Helper.data.find(cssSelector).each(function (i, elem) {
      Helper.json[i].data[key] = Helper.$(elem).next().text()
    });
  };

  Helper.parserHTML = function (html) {
    Helper.$    = cheerio.load(html);

    Helper.$('#tabDados').filter(function () {
    Helper.data = Helper.$(this);

      // Fetch each images on context
      Helper.data.find('img').each(function (i, elem) {
        Helper.json[i] = {
          name : Helper.getDamName(elem.attribs.src),
          data : {}
        };
      });

      // Fetch each td with content "volume armazenado"
      Helper.buildJSON('td:contains(volume armazenado)', 'volume_armazenado');

      // Fetch each td with content "pluviometria do dia"
      Helper.buildJSON('td:contains(pluviometria do dia)', 'pluviometria_do_dia');

      // Fetch each td with content "pluviometria acumulada no mês"
      Helper.buildJSON('td:contains(pluviometria acumulada no mês)', 'pluviometria_acumulada_mes');

      // Fetch each td with content "média histórica do mês"
      Helper.buildJSON('td:contains(média histórica do mês)', 'media_historica_mes');
    });

    return Helper.json;
  };

  Helper.buildData = function(date, token) {
    date = date.split('-');

    return {
      "__VIEWSTATE": token.state,
      "__EVENTVALIDATION": token.validation,
      "Imagebutton1.x": 8,
      "Imagebutton1.y": 6,
      "cmbDia": parseInt(date[2], 10),
      "cmbMes": parseInt(date[1], 10),
      "cmbAno": parseInt(date[0], 10)
    };
  };

  module.exports = Helper;
})();