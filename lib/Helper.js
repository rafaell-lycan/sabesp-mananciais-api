(function (){
  var cheerio = require('cheerio');

  var Helper = {
    data: null,
    $ : null,
    dams : {}
  };

  Helper.getDamName = function (str) {
    return str.split(/[./]+/)[1];
  };

  Helper.buildJSON = function (cssSelector, key) {
    Helper.data.find(cssSelector).each(function (i, elem) {
      Helper.json.dams[i].data.push({
        key : key,
        value : Helper.$(elem).next().text()
      });
    });
  };

  Helper.parserHTML = function (html, date) {
    Helper.json = {
      date: '',
      dams: []
    };
    Helper.$    = cheerio.load(html);

    Helper.$('#tabDados').filter(function () {
    Helper.data = Helper.$(this);

    Helper.json.date = date;

      // Fetch each images on context
      Helper.data.find('img').each(function (i, elem) {
        Helper.json.dams[i] = {
          name : Helper.dams[Helper.getDamName(elem.attribs.src)],
          data : []
        };
      });


      // Fetch each td with content "volume armazenado"
      Helper.buildJSON('td:contains(volume armazenado)', 'volume armazenado');

      // Fetch each td with content "pluviometria do dia"
      Helper.buildJSON('td:contains(pluviometria do dia)', 'pluviometria do dia');

      // Fetch each td with content "pluviometria acumulada no mês"
      Helper.buildJSON('td:contains(pluviometria acumulada no mês)', 'pluviometria acumulada no mês');

      // Fetch each td with content "média histórica do mês"
      Helper.buildJSON('td:contains(média histórica do mês)', 'média histórica do mês');
    });

    return Helper.json;
  };

  Helper.today = function() {
    var date  = new Date(),
        year  = date.getFullYear(),
        month = date.getMonth() + 1,
        day   = date.getDate();

    return year + '-' + (month <= 9 ? '0' + month : month) + '-' + (day <= 1 ? '0' + day  : day);
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
