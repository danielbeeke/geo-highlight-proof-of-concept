(function ($) {
  
  var map = L.map('map', {
    attributionControl: false
  }).setView([51.505, -0.09], 6)

  var baseUrl = function (currentMap) {
    var n = new Date().getTime()

    return 'http://{s}.tilemill.studiofonkel.nl/style/{z}/{x}/{y}.png?id=tmstyle:///home/administrator/' + currentMap + '.tm2&mtime=' + n
  }

  var layer = L.tileLayer(baseUrl('countries')).addTo(map)
  var highlightLayer = L.tileLayer(baseUrl('countries')).addTo(map)
  var utfGrid = new L.UtfGrid('http://{s}.tilemill.studiofonkel.nl/utfgrid-getter/{z}/{x}/{y}.grid.json?callback={cb}&id=tmstyle:///home/administrator/countries.tm2')

  map.addLayer(utfGrid)

  utfGrid.on('click', function (e) {
    highlightLayer.setUrl(baseUrl('generated/countries-' + e.data.iso_a2))
  })

})(jQuery)

