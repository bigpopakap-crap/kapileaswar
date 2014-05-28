/**
 * Public constants for logging levels
 */
var Level = {
	NONE: { pri: -1000, name: 'NONE' },
	TRACE: { pri: 1, name: 'TRACE' },
	DEBUG: { pri: 2, name: 'DEBUG' },
	INFO: { pri: 3, name: 'INFO' },
	WARN: { pri: 4, name: 'WARN' },
	ERROR: { pri: 5, name: 'ERROR' }
};
KLogger.Level = Level;

/**
 * Javascript logger
 */
function KLogger(LOGGING_LEVEL) {

	//Member variables
	var isInitialized = false;
	var curLevel = null;		//can only be set during initialization
	var allowAlerts = null;

	//Creates a function to take a level and message, and either logs it or alerts it,
	//if the logger level allows it and alerts are allowed
	var createLogOrAlertFn = function (isAlert) {
		return function (level, message) {
			//test whether we can print the message based on configuration of the logger
			if (isInitialized && curLevel.pri >= 0 && level.pri >= curLevel.pri) {
				var output = 'KLogger [' + level.name + ']: ' + message;

				//either log or alert the message
				if (isAlert && allowAlerts) alert(output);
				else console.log(output + (isAlert ? ' (alert suppressed)' : ''));
			}
		}
	};

	/**
	 * Initialize with the given level
	 * @param level
	 */
	function init(level) {
		if (!this.isInitialized) {
			curLevel = level;
			allowAlerts = true; //TODO don't allow alerts in production
			isInitialized = true;

			//Log that this has been initialized
			info('Logger initialized at level ' + getLevel().name);
		}
		else {
			//this has already been initialized, log an error
			warn('Logger has already been initialized');
		}
	};

	//Gets the current logging level
	function getLevel() {
		if (isInitialized) {
			return curLevel;
		}
		else {
			//log an error
			console.log('Error: this Logger has not yet been initialized');
			return null;
		}
	};
	this.getLevel = getLevel;

	//Methods to log or alert messages
	var log = createLogOrAlertFn(false);
	var doAlert = createLogOrAlertFn(true);
	this.log = log;
	this.doAlert = doAlert;

	//Shortcut methods for logging at specific levels
	function trace(message) { log(Level.TRACE, message); };
	function debug(message) { log(Level.DEBUG, message); };
	function info(message) { log(Level.INFO, message); };
	function warn(message) { log(Level.WARN, message); };
	function error(message) { log(Level.ERROR, message); };
	this.trace = trace;
	this.debug = debug;
	this.info = info;
	this.warn = warn;
	this.error = error;

	//Shortcut methods for alerting at specific levels
	function traceAlert(message) { doAlert(Level.TRACE, message); };
	function debugAlert(message) { doAlert(Level.DEBUG, message); };
	function infoAlert(message) { doAlert(Level.INFO, message); };
	function warnAlert(message) { doAlert(Level.WARN, message); };
	function errorAlert(message) { doAlert(Level.ERROR, message); };
	this.traceAlert = traceAlert;
	this.debugAlert = debugAlert;
	this.infoAlert = infoAlert;
	this.warnAlert = warnAlert;
	this.errorAlert = errorAlert;
	
	/*
	 * DO THE INITIALIZATION
	 */
	init(LOGGING_LEVEL);
};