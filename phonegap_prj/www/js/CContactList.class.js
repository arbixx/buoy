/**
 * Class: CContactList and CContact
 * 
 * This class is used to retrieve and handle the list of contacts of the user (phone number, name, etc) 
 * 
 */
function CContact(){
	
	/** Private properties */
	var phoneId_ 		= null;
	var name_			= null;
	var phoneNumber_	= null;
	
	/** Public Methods */
	this.getPhoneId = function(){
		return phoneId_;
	}
	this.setPhoneId = function(id){
		phoneId_ = id;
	}
	
	this.getName = function(){
		return name_;
	}
	this.setName = function(n){
		name_ = n;
	}
	
	this.getPhoneNumber = function(){
		return phoneNumber_;
	}
	this.setPhoneNumber = function(pn){
		phoneNumber_ = pn;
	}
	
	
}

function tri(a,b){
	var namea = a.getName();
	var nameb = b.getName();
	return ( namea < nameb ) ? -1 : 1; 
}


function CContactList(){
    
	/** Private properties */
	var contacts_ = null;
	var contactList_ = new Array();
	
	
	/** Public methods */
	this.init = function(){
		if ( navigator.contacts )
			contacts_ = navigator.contacts;
		else{
			contacts_ = null;
			oLogger.error("Unable to initiate ContactList object.");
		}
	}
	
	this.isPopulated = function(){
		return (contactList_.length > 0);
	}
	
	this.getList = function(){
		oLogger.info("Getting contact list from mobile...");
		var div = document.getElementById("contactlist");
		try{
			/** DEBUG: fills the contact list if contacts is null (for browsers) */
			if ( contacts_ == null ){
				var c1 = new CContact();
				c1.setPhoneId("1");
				c1.setPhoneNumber("0668122354");
				c1.setName("Arbi");
				var c2 = new CContact();
				c2.setPhoneId("2");
				c2.setPhoneNumber("0665341976");
				c2.setName("Francoise");
				var c3 = new CContact()
				c3.setPhoneId("3");
				c3.setPhoneNumber("0769432189");
				c3.setName("Matthieu");
				contactList_.push(c1);
				contactList_.push(c2);
				contactList_.push(c3);
				oLogger.info("Tri...");
				contactList_.sort(tri);
				oLogger.info("Build markup..."); 
				buildContactListDialogMarkup();
				
				return;
			}
			
			/** Call the find method */
			var contactFindOptions = {
					filter: "",
					multiple: true
			};
			var contactFields = ["id","displayName", "name", "nickname", "phoneNumbers"];
			contacts_.find(
					contactFields,
					onContactFindSuccess,
					onContactFindError,
					contactFindOptions
			);
		}
		catch(err){
			div.innerHTML += "<p>"+err+"</p>";
			oLogger.error(err);
		}
		finally{
			oLogger.info("... done getting contact list.");
		}
	}
	
	var onContactFindSuccess = function(contacts){
		oLogger.info("Processing contact list response from mobile...");
		try{
			var div = document.getElementById("contactlist");
			/** Loops on every contact */		
			if ( contacts != null && typeof(contacts)!='undefined' ){
				
				for( var i=0; i<contacts.length; i++ ){
					
					/** Current processed contact */
					var contact = contacts[i];
					var contactId = contact.id;
					var contactName = contact.displayName;
					var contactPhoneNumbers = contact.phoneNumbers;
					
					if ( contactName == null || typeof contactName == 'undefined' || contactName.length==0 )
						continue;
					if ( contactPhoneNumbers == null || typeof contactPhoneNumbers == 'undefined' || contactPhoneNumbers.length==0 )
						continue;
						
					for( var j=0; j<contactPhoneNumbers.length; j++){
						if ( contactPhoneNumbers[j].value.length <= 9)
							continue;
						var newContact = new CContact();
						newContact.setName(contactName.toUpperCase());
						newContact.setPhoneId(contactId);
						newContact.setPhoneNumber(contactPhoneNumbers[j].value);
						contactList_.push(newContact);
					}
					
				}
				
				/** Sort the contact list */
				contactList_.sort(tri);
				
				/** Build contacts dialog markup */
				buildContactListDialogMarkup();
				
			}
			else{
				div.innerHTML += "<p>contacts retrieved is null</p>";
			}
		}
		catch(err){
			oLogger.error(err);
			div.innerHTML += "<p>"+err+"</p>";
		}
		finally{
			oLogger.info("... done processing contact list.");
		}
	}
	
	var onContactFindError = function(error){
		oLogger.error(error);
		div.innerHTML += "<p>"+error+"</p>";
	}
	
	var buildContactListDialogMarkup = function(){
		try{
			oLogger.info("Getting div...");
			/** Div to modify */
			var div = document.getElementById("contactlist");
			
			/** Contact list has been processed. Display it */
			oLogger.info("Looping on contacts...");
			var contactListMarkup = "";
			contactListMarkup = "<ul id='contacts' data-role='listview' data-filter='true' data-filter-placeholder='Chercher contact...' data-autodividers='true'>";
			for( var i=0; i<contactList_.length; i++){
				var currContact = contactList_[i];
				contactListMarkup += "<li data-icon='false' id='"+currContact.getPhoneId()+"'>"+currContact.getName()+" ("+currContact.getPhoneNumber()+")</li>"
			}
			contactListMarkup += "</ul>";
			div.innerHTML = contactListMarkup;
			
			oLogger.info("Triggering create...");
			/** triggers the jqm enhancement (with Firefox patch) */
			if ( contacts_ != null )
				try{ $('#contactlist').trigger("create"); }catch(err){};
			
			/** adds a click listener to handle multiple picking of contacts */
			oLogger.info("Binding click function...");
			$('#contacts li').bind(
					'click',
					function(){
						try{
							//oLogger.info("bind func: $(this).attr('id')="+$(this).attr("id"));
							if ( $(this).hasClass("ui-btn-up-c") ){
								$(this).removeClass("ui-btn-up-c").addClass("ui-btn-up-b");
								//$(this).attr("data-icon","check");
								oEvent.addAttendee( getContactFromPhoneId( $(this).attr("id") ) );
							}
							else{
								$(this).removeClass("ui-btn-up-b").addClass("ui-btn-up-c");
								//$(this).attr("data-icon","false");
								oEvent.removeAttendee( $(this).attr("id") );
							}
							//$('#contacts').trigger('create');
						}
						catch(err){
							oLogger.error(err);
						}
					}
					
			);
		}
		catch(err){
			oLogger.error(err);
		}
	}

	
	var getContactFromPhoneId = function(id){
		
		try{
			for( var i=0; i<contactList_.length; i++){
				if ( contactList_[i].getPhoneId() == id )
					return contactList_[i];
			}
			
		}
		catch(err){
			oLogger.error(err);
		}
		return null;
	}
}

/** Instantiation of the global Handset object used throughout all JS files */
oLogger.info("Building a ContactList object...")
var oContactList = new CContactList();
oContactList.init();
