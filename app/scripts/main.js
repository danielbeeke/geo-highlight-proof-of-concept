(function ($) {
  
  var map = L.map('map').setView([51.505, -0.09], 6);

  var date = new Date();
  var milliseconds = date.getMilliseconds(); 

  var baseUrl = function (currentMap) {
    return 'http://{s}.tilemill.studiofonkel.nl/style/{z}/{x}/{y}.png?id=tmstyle:///home/administrator/' + currentMap + '.tm2&mtime=' + milliseconds;
  }

  var layer = L.tileLayer(baseUrl('countries')).addTo(map);

  new L.Control.GeoSearch({
      provider: new L.GeoSearch.Provider.Google(),
      showMarker: false,
      zoomLevel: 6
  }).addTo(map);

  $('#map').on('google_geocode_response', function (event, data) {
    layer.setUrl(baseUrl('generated/countries-' + data.address_components.pop().short_name))
  })


  L.GeoSearch.Provider.Google.prototype.GetLocations = function(qry, callback) {
    var geocoder = L.GeoSearch.Provider.Google.Geocoder;

    var parameters = L.Util.extend({
        address: qry
    }, this.options);

    var results = geocoder.geocode(parameters, function(data){

        $('#map').trigger('google_geocode_response', data)

        data = {results: data};

        if (data.results.length == 0)
            return [];

        var results = [];
        for (var i = 0; i < data.results.length; i++)
            results.push(new L.GeoSearch.Result(
                data.results[i].geometry.location.lng(),
                data.results[i].geometry.location.lat(),
                data.results[i].formatted_address
            ));

        if(typeof callback == 'function')
            callback(results);
    });
  }

})(jQuery);
