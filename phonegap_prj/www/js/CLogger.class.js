/**
 * Class: CLogger
 * 
 * Implements a simple logger class based upon console.log and alert (if console.log not available). Dummy mod.
 * 
 * 
 */
function CLogger(){
    
	/** Buffer for the on screen console */
	var buffer = "";
	var onScreenConsole = document.getElementById("console");
	
    this.debug = function(msg){
        writeLevelAndMsg('DEBUG',msg);
    }
    
    this.info = function(msg){
        writeLevelAndMsg('INFO',msg);
    }
    
    this.warn = function(msg){
        writeLevelAndMsg('WARN',msg);
    }
        
    this.error = function(msg){
        writeLevelAndMsg('ERROR',msg);
    }
        
    function writeLevelAndMsg(level,msg){
        writeMsg('['+level+'] '+msg);
    }
    
    function writeMsg(msg){
        if ( typeof console != 'undefined' ){
            console.log(msg);
        }
        else
            alert(msg);
        buffer += "<p>"+msg+"</p>";
        if ( onScreenConsole != null && typeof onScreenConsole != 'undefined' )
        	onScreenConsole.innerHTML = buffer;
    }   
}

/** Declaration and instantiation of the global Logger object used throughout all JS files */
var oLogger = new CLogger();