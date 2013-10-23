/****
	*	This class describes the interaction with the Google Maps API.
	*	
	*	Mandatory: the inclusion of the Google Maps API JS files before including this class.
	*
	*	Author: Arbi HADER
	*
	*
	*/
var CGoogleMaps = function(div){
	
	/** CONSTANTS */
	var MAP_TYPE_ID = google.maps.MapTypeId.ROADMAP;
	var API_KEY		= "AIzaSyCXrYix2NHdjG9LwxXIXyKQ-tQ0kgi8G2A";
	
	/** Google Maps object */
	var oGoogleMaps_ = null
	var divToDisplayMap_ = document.getElementById(div);
	
	
	/** Private methods */
	
	
	
	
	/** Public methods */
	this.init = function(lat,long){
		
		var mapOptions = {
				center: new google.maps.LatLng(lat,long),
				zoom: 8,
				mapTypeId: MAP_TYPE_ID
		};
		oGoogleMaps_ = new google.maps.Map(divToDisplayMap_, mapOptions);
	}
	this.getMapsObject = function(){
		return oGoogleMaps_;
	}
	
}