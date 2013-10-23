/**
 * Class: CEvent
 * 
 * Describes an event created by a user (ie. its location, picture, infos, list of attendants...)
 * 
 * 
 */
function CEvent(){
    
	/** Private properties */
	var eventLatLng_ 		= null;
	var eventUsername_		= null;
	var eventUseremail_		= null;
	var eventName_ 			= null;
	var eventDesc_			= null;
	var eventAttendeeList_	= new Array();//array of phone ids
	
	/** Public properties */
	//...
	
	
	/** Public methods */
	this.getLatLng = function(){
		return eventLatLng_;
	}
	this.setLatLng = function(latlng){
		eventLatLng_ = latlng;
	}
	
	this.getUsername = function(){
		return eventUsername_;
	}
	this.setUsername = function(un){
		eventUsername_ = un;
	}
	
	this.getUseremail = function(){
		return eventUseremail_;
	}
	this.setUseremail = function(em){
		eventUseremail_ = em;
	}
	
	this.getEventname = function(){
		return eventName_;
	}
	this.setEventname = function(n){
		eventName_ = n;
	}
	
	this.getEventdesc = function(){
		return eventDesc_;
	}
	this.setEventdesc = function(d){
		eventDesc_ = d;
	}
	
	this.getAttendeelist = function(){
		return eventAttendeeList_;
	}
	
	this.addAttendee = function(a){
		if (eventAttendeeList_.indexOf(a) == -1)
			eventAttendeeList_.push(a);
	}
	this.removeAttendee = function(phoneid){
		for ( var i=0; i<eventAttendeeList_.length; i++ ){
			if ( eventAttendeeList_[i].getPhoneId()==phoneid ){
				eventAttendeeList_.splice(i,1);
				break;
			}
		}
	}
	
	/****************************/
	/** Ajax calls nd callbacks */
	/****************************/
	var eventLatLng_ 		= null;
	var eventUsername_		= null;
	var eventUseremail_		= null;
	var eventName_ 			= null;
	var eventDesc_			= null;
	var eventAttendeeList_	= new Array();//array of phone ids
	this.ajaxSaveBuoy(){
		try{
			//First test if buoy's vars are corrects
			if ( 
					eventLatLng_ != null 
					&& eventUsername_ != null && eventUsername_.length > 0 
					&& eventUseremail_ != null && eventUseremail_.length > 0
					&& eventName_ != null && eventName_.length > 0
					&& eventDesc_ != null && eventDesc_.length > 0
					&& eventAttendeeList_.length > 0
					){
				//then make the ajax call for DB insertion
				
			}
			else{
				oLogger.error("One of buoy's variable is not correct.");
			}
		}
		catch(err){
			oLogger.error(err);
		}
	}
	
	
    /** Private methods */
	
	
}

/** Declaration and instantiation of the global Event object used throughout all JS files */
oLogger.info("Building Event object...");
var oEvent = new CEvent();