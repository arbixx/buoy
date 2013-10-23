/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * User has located himself and hot the "Validate" button. Location must be stored.
 */
function validateLocation(){
	oLogger.info("Validating user location...");
	try{
		/** Retrieves marker position on google maps */
		var latlng = oGeoloc.getMarkerPosition();
		oLogger.info("Marker has position: "+latlng.toString());
		
		if ( latlng != null ){
			oLogger.info("Storing position into Event object...");
			oEvent.setLatLng(latlng);
		}
		else{
			throw "validateLocation(): Map Marker returned null as Position";
		}
		
		/** Closes dialog */
		$('.ui-dialog').dialog('close');
		
	}
	catch(err){
		oLogger.error(err);
	}
	finally{
		oLogger.info("... user location validated.");
	}
}

function validateInfos(){
	oLogger.info("Validating infos...");
	var bValid = false;
	try{
		/** Retrieving input values */
		var userName 	= document.getElementById("username").value;
		var userEmail 	= document.getElementById("useremail").value;
		var buoyName 	= document.getElementById("buoyname").value;
		var buoyDesc 	= document.getElementById("buoydesc").value;
		
		oLogger.info("User Name: "+userName);
		oLogger.info("User Email: "+userEmail);
		oLogger.info("Buoy Name: "+buoyName);
		oLogger.info("Buoy Desc: "+buoyDesc);
		
		bValid = true;
		
		/** User name must be entered */
		if ( userName.length == 0 ){
			//TODO...
			bValid = false;
		}
		/** User email must be entered and plausible */
		if ( userEmail.length > 0 ){
			//TODO: check that the email has a correct format (*@*.*)
		}
		else{
			//TODO...
			bValid = false;
		}
		/** Buoy Name must be entered */
		if ( buoyName.length == 0 ){
			//TODO...
			bValid = false;
		}
		/** Buoy Desc must be entered */
		if ( buoyDesc.length == 0 ){
			//TODO...
			bValid = false;
		}
		
		/** If infos are valid, store them into the event object */
		if ( bValid ){
			oEvent.setUsername(userName);
			oEvent.setUseremail(userEmail);
			oEvent.setEventname(buoyName);
			oEvent.setEventdesc(buoyDesc);
		}
		
	}
	catch(err){
		oLogger.error(err);
	}
	finally{
		oLogger.info("... done validating infos ["+bValid+"].");
	}
	return bValid;
}


function showContacts(){
	try{
		if ( !oContactList.isPopulated() )
			oContactList.getList();
	}
	catch(err){
		oLogger.error(err);
	}
}

function updateAttendeeList(){
	try{
		/** Div to update */
		var div = document.getElementById("attendeelist");
		
		/** Loop on the attendee list and build markup */
		var attendeeListMarkup = "";
		attendeeListMarkup = "<ul id='attendees' data-role='listview'>";
		for( var i=0; i<oEvent.getAttendeelist().length; i++){
			var currAttendee = oEvent.getAttendeelist()[i];
			attendeeListMarkup += "<li data-icon='false' id='"+currAttendee.getPhoneId()+"'>"+currAttendee.getName()+" ("+currAttendee.getPhoneNumber()+")</li>"
		}
		attendeeListMarkup += "</ul>";
		div.innerHTML = attendeeListMarkup;
		
		/** triggers the jqm enhancement */
		$('#attendeelist').trigger("create");
	}
	catch(err){
		oLogger.error(err);
	}
}

function testSendSMS(){
	try{
		var number = "0668122354";
        var message = "Test Message";
        var intent = ""; //leave empty for sending sms using default intent
        var success = function () { alert('Message sent successfully'); };
        var error = function (e) { alert('Message Failed:' + e); };
        sms.send(number, message, intent, success, error);
	}
	catch(err){
		oLogger.error(err);
	}
}

function scale( width, height, padding, border ) {
    var scrWidth = $( window ).width() - 30,
        scrHeight = $( window ).height() - 30,
        ifrPadding = 2 * padding,
        ifrBorder = 2 * border,
        ifrWidth = width + ifrPadding + ifrBorder,
        ifrHeight = height + ifrPadding + ifrBorder,
        h, w;

    if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
        w = ifrWidth;
        h = ifrHeight;
    } else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
        w = scrWidth;
        h = ( scrWidth / ifrWidth ) * ifrHeight;
    } else {
        h = scrHeight;
        w = ( scrHeight / ifrHeight ) * ifrWidth;
    }

    return {
        'width': w - ( ifrPadding + ifrBorder ),
        'height': h - ( ifrPadding + ifrBorder )
    };
}



