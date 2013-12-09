(function ($) {

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
