!function(a){L.GeoSearch.Provider.Google.prototype.GetLocations=function(b,c){{var d=L.GeoSearch.Provider.Google.Geocoder,e=L.Util.extend({address:b},this.options);d.geocode(e,function(b){if(a("#map").trigger("google_geocode_response",b),b={results:b},0==b.results.length)return[];for(var d=[],e=0;e<b.results.length;e++)d.push(new L.GeoSearch.Result(b.results[e].geometry.location.lng(),b.results[e].geometry.location.lat(),b.results[e].formatted_address));"function"==typeof c&&c(d)})}}}(jQuery),function(a){var b=L.map("map",{}).setView([51.505,-.09],6),c=new Date,d=c.getMilliseconds(),e="countries",f=function(a){return"http://{s}.tilemill.studiofonkel.nl/style/{z}/{x}/{y}.png?id=tmstyle:///home/administrator/"+a+".tm2&mtime="+d},g=L.tileLayer(f("countries")).addTo(b),h=new L.UtfGrid("http://{s}.tilemill.studiofonkel.nl/utfgrid-getter/{z}/{x}/{y}.grid.json?callback={cb}&id=tmstyle:///home/administrator/countries.tm2");b.addLayer(h),h.on("click",function(a){e=a.data.iso_a2,g.setUrl(f("generated/countries-"+e))}),new L.Control.GeoSearch({provider:new L.GeoSearch.Provider.Google,showMarker:!1,zoomLevel:6}).addTo(b),a("#map").on("google_geocode_response",function(a,b){e=b.address_components.pop().short_name,g.setUrl(f("generated/countries-"+e))}),L.TileLayer.prototype.getTileUrl=function(b){if(h._cache[b.z+"_"+b.x+"_"+b.y]){var c=h._cache[b.z+"_"+b.x+"_"+b.y],f=!1;if(c.data&&(a.each(c.data,function(a,b){b.iso_a2==e&&(f=!0)}),!f))return mapToUse="http://{s}.tilemill.studiofonkel.nl/style/{z}/{x}/{y}.png?id=tmstyle:///home/administrator/countries.tm2&mtime="+d,L.Util.template(mapToUse,L.extend({s:this._getSubdomain(b),z:b.z,x:b.x,y:b.y},this.options))}return L.Util.template(this._url,L.extend({s:this._getSubdomain(b),z:b.z,x:b.x,y:b.y},this.options))}}(jQuery);