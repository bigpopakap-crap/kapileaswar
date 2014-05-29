/**
 * Public constants for logging levels
 */
KLogger.Level = {
	NONE: { pri: -1000, name: 'NONE' },
	TRACE: { pri: 1, name: 'TRACE' },
	DEBUG: { pri: 2, name: 'DEBUG' },
	INFO: { pri: 3, name: 'INFO' },
	WARN: { pri: 4, name: 'WARN' },
	ERROR: { pri: 5, name: 'ERROR' }
};

/**
 * Javascript logger
 * 
 * options
 * 		level - the min logging level, must be one
 * 				of the above enum
 * 		allowAlerts - do we allow the logger to do alerts?
 * 		loggerName - the name of this logger
 */
function KLogger(options) {
	
	var Level = KLogger.Level;
	
	options = options || {};
	var level = options.level || Level.INFO;
	var allowAlerts = ('boolean' == typeof options.allowAlerts) ? options.allowAlerts : false;
	var loggerName = options.loggerName || 'KLogger';
	
	//Creates a function to take a level and message, and either logs it or alerts it,
	//if the logger level allows it and alerts are allowed
	var createLogOrAlertFn = function (isAlert) {
		return function (level, message) {
			//test whether we can print the message based on configuration of the logger
			if (getLevel().pri >= 0 && level.pri >= getLevel().pri) {
				var output = getLoggerName() + ' [' + level.name + ']: ' + message;

				//either log or alert the message
				if (isAlert && allowAlerts) alert(output);
				else console.log(output + (isAlert ? ' (alert suppressed)' : ''));
			}
		}
	};
	
	function getLoggerName() {
		return loggerName;
	}

	/**
	 * Gets the current logging level
	 */
	function getLevel() {
		return level;
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
	
	info('Initialized ' + getLoggerName() + ' at level ' + getLevel().name);
	
};