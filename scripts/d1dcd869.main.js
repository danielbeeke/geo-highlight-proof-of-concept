!function(a){var b=L.map("map").setView([51.505,-.09],6),c=new Date,d=c.getMilliseconds(),e=function(a){return"http://{s}.tilemill.studiofonkel.nl/style/{z}/{x}/{y}.png?id=tmstyle:///home/administrator/"+a+".tm2&mtime="+d},f=L.tileLayer(e("countries")).addTo(b);new L.Control.GeoSearch({provider:new L.GeoSearch.Provider.Google,showMarker:!1,zoomLevel:6}).addTo(b),a("#map").on("google_geocode_response",function(a,b){f.setUrl(e("generated/countries-"+b.address_components.pop().short_name))}),L.GeoSearch.Provider.Google.prototype.GetLocations=function(b,c){{var d=L.GeoSearch.Provider.Google.Geocoder,e=L.Util.extend({address:b},this.options);d.geocode(e,function(b){if(a("#map").trigger("google_geocode_response",b),b={results:b},0==b.results.length)return[];for(var d=[],e=0;e<b.results.length;e++)d.push(new L.GeoSearch.Result(b.results[e].geometry.location.lng(),b.results[e].geometry.location.lat(),b.results[e].formatted_address));"function"==typeof c&&c(d)})}}}(jQuery);