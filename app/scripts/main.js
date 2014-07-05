(function ($) {

  var map = L.mapbox.map('map', 'graphius.gfan7dd3')
    .setView([52, 5], 8);

  var baseUrl = function (currentMap) {
    var n = new Date().getTime()

    return 'http://{s}.tilemill.studiofonkel.nl/style/{z}/{x}/{y}.png?id=tmstyle:///home/administrator/styles/country-variants/country-variants-' + currentMap + '.tm2&mtime=' + n
  }

  var layer = L.tileLayer('https://www.mapbox.com/v3/graphius.gfan7dd3/{z}/{x}/{y}.png').addTo(map)
  var highlightLayer = L.tileLayer('https://www.mapbox.com/v3/graphius.gfan7dd3/{z}/{x}/{y}.png').addTo(map)

  var utfGrid = new L.UtfGrid('http://{s}.tilemill.studiofonkel.nl/utfgrid-getter/{z}/{x}/{y}.grid.json?callback={cb}&id=tmstyle:///home/administrator/styles/country-variants/country-variants.tm2')
  map.addLayer(utfGrid)

  utfGrid.on('click', function (e) {
    highlightLayer.setUrl(baseUrl(e.data.iso_alpha2))
  })

})(jQuery)

