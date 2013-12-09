(function ($) {
  
  var map = L.map('map', {
    // fadeAnimation: false
  }).setView([51.505, -0.09], 6);

  var date = new Date();
  var milliseconds = date.getMilliseconds(); 
  var globalCurrentMap = 'countries'

  var baseUrl = function (currentMap) {
    return 'http://{s}.tilemill.studiofonkel.nl/style/{z}/{x}/{y}.png?id=tmstyle:///home/administrator/' + currentMap + '.tm2&mtime=' + milliseconds;
  }

  var layer = L.tileLayer(baseUrl('countries')).addTo(map);

  var utfGrid = new L.UtfGrid('http://{s}.tilemill.studiofonkel.nl/utfgrid-getter/{z}/{x}/{y}.grid.json?callback={cb}&id=tmstyle:///home/administrator/countries.tm2');

  map.addLayer(utfGrid);

  utfGrid.on('click', function (e) {
    globalCurrentMap = e.data.iso_a2
    layer.setUrl(baseUrl('generated/countries-' + globalCurrentMap))
  });

  new L.Control.GeoSearch({
      provider: new L.GeoSearch.Provider.Google(),
      showMarker: false,
      zoomLevel: 6
  }).addTo(map);

  $('#map').on('google_geocode_response', function (event, data) {
    globalCurrentMap = data.address_components.pop().short_name
    layer.setUrl(baseUrl('generated/countries-' + globalCurrentMap))
  })

  L.TileLayer.prototype.getTileUrl = function (tilePoint) {
    if (utfGrid._cache[tilePoint.z + '_' + tilePoint.x + '_' + tilePoint.y]) {
      var cache= utfGrid._cache[tilePoint.z + '_' + tilePoint.x + '_' + tilePoint.y]
      var found = false

      if (cache.data) {
        $.each(cache.data, function (index, item) {
          if(item.iso_a2 == globalCurrentMap) {
            found = true
          }
        })

        if (!found) {
          mapToUse = 'http://{s}.tilemill.studiofonkel.nl/style/{z}/{x}/{y}.png?id=tmstyle:///home/administrator/countries.tm2&mtime=' + milliseconds

          return L.Util.template(mapToUse, L.extend({
            s: this._getSubdomain(tilePoint),
            z: tilePoint.z,
            x: tilePoint.x,
            y: tilePoint.y
          }, this.options));
        }
      }
    }

    return L.Util.template(this._url, L.extend({
      s: this._getSubdomain(tilePoint),
      z: tilePoint.z,
      x: tilePoint.x,
      y: tilePoint.y
    }, this.options));
  }

})(jQuery);

