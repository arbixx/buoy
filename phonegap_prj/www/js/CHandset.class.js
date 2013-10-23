/**
 * Class: CHandset
 * 
 * This class is used to store every handset-dependant property like screen size, resolution, etc... 
 * 
 */
function CHandset(){
    
	/** Private properties */
	var userAgent_;
	var screenWidth_;
	var screenHeight_;
	
	/** Public methods */
	this.init = function(){
		screenWidth_ 	= window.screen.availWidth;
		//oLogger.info("Handset has a width of: "+screenWidth_);
		screenHeight_ 	= window.screen.availHeight;
		//oLogger.info("Handset has a height of: "+screenHeight_);
		userAgent_ 		= navigator.userAgent;
		//oLogger.info("Handset has a UA of: "+userAgent_);
		//alert("Handset has a width of: "+screenWidth_);
		//alert("Handset has a height of: "+screenHeight_);
		//alert("Handset has a UA of: "+userAgent_);
	}
	
	this.getWidth = function(){
		return screenWidth_;
	}
	this.getHeight = function(){
		return screenHeight_;
	}
	this.getUserAgent = function(){
		return userAgent_;
	}
}

/** Instantiation of the global Handset object used throughout all JS files */
oLogger.info("Building Handset object...")
var oHandset = new CHandset();
oHandset.init();