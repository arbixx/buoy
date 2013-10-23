/****
	*	This class allows the app to geolocate the user.
	*	
	*
	*	Author: Arbi HADER
	*
	*
	*/
var CGeoloc = function(divToDisplayMapInto){
	
	/** Private properties */
	var CLASS = "CGeoloc";
	var gl_ = null; //will hold the navigator.geolocation reference (if available)
	var oGMaps_ = null; //reference to the google maps oject displayed in the dedicated div
	var oGMapsMarker_ = null; //reference to the google maps marker the user can drag across the map
	var divMapDisplay_ = divToDisplayMapInto;
	
	/********************/
	/** Private methods */
	/********************/
	/** Called upon successful retrieval of the user position.
	 * A GoogleMaps object must be constructed and used to display the user location on a map embedded in a dedicated div.
	 */
	var onGeolocationSuccess = function(position)
	{
		/** Retrieves latitude and longitude */
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		oLogger.info("onGeolocationSuccess: coords retrieved are "+latitude+":"+longitude);
		
		/** Lat/Lng in google formats */
		var LatLng = new google.maps.LatLng(latitude,longitude);
		
		/** Builds the gMaps object and triggers the display in the dedicated div */
		oLogger.info("onGeolocationSuccess: Building gMaps and gMapsMarker objects...");
	    var mapOptions = {
	        zoom: 15,
	        center: LatLng,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    }
	    oGMaps_ = new google.maps.Map(frames["mapFrame"].document.getElementById(divToDisplayMapInto), mapOptions);
	    
	    /** Builds the markr to drag across the map */
	    oGMapsMarker_ = new google.maps.Marker({
	    	position: LatLng,
	    	map: oGMaps_,
	    	title: "Placez moi!",
	    	draggable: true,
	    	animation: google.maps.Animation.BOUNCE
	    });
	    oLogger.info("onGeolocationSuccess: ... done.");
		
		
	}
	
	var onGeolocationError = function(poserror)
	{
		/**
		 * poserror.code = PositionError.PERMISSION_DENIED | PositionError.POSITION_UNAVAILABLE | PositionError.TIMEOUT
		 * poserror.message = message describing the details of the error encountered
		 */
		alert("onGeolocationError: ["+poserror.code+"]["+poserror.message+"]");
	}
	
	
	/*******************/
	/** Public methods */
	/*******************/
	/** Initializes the geolocation object */
	this.init = function(){
		if (navigator.geolocation)
			gl_ = navigator.geolocation;
		else
			gl_ = null;
	}
	
	/** Gets the user current position */
	this.getCurrentPosition = function(){
		if ( gl_ != null )
		{
			var geolocOptions = { 
					maximumAge: 10000,
					timeout: 30000,
					enableHighAccuracy: true
			};
			gl_.getCurrentPosition( 
					onGeolocationSuccess,
					onGeolocationError,
					geolocOptions
			);
		}
		else
		{
			oLogger.error(CLASS+"getCurrentPosition(): Unable to get current position.");
		}
	}
	
	/** Returns the located position of the user */
	this.getMarkerPosition = function(){
		if ( oGMapsMarker_ != null )
			return oGMapsMarker_.getPosition();
		return null;
	}
	
	
}

/** Instantiation of the geoloc object used throughout the JS files */
oLogger.info("Building Geoloc object...");
var oGeoloc = new CGeoloc("map_canvas");
oGeoloc.init();