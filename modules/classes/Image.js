/**
 * Class to represent an image and associated data
 * 
 * @param url the path to the image
 * @param options
 * 		centerx - the location of the "center of focus" from left to right
 * 					(can be undefined, default undefined) //TODO in pixels or %?
 * 		centery - the location of the "center of focus" from top to bottom
 * 					(can be undefined, default undefined) //TODO in pixels or %?
 * 		alt - any caption or alternate text to go along with this Image
 * 					(can be undefined, default undefined)
 */
function Image(url, options) {
	
	options = options || {};

	function getUrl() {
		return url;
	}
	this.getUrl = getUrl;
	
	function getCenterX() {
		return options.centerx;
	}
	this.getCenterX = getCenterX;
	
	function getCenterY() {
		return options.centery;
	}
	this.getCenterY = getCenterY;
	
	function getCenter() {
		return {
			x: getCenterX(),
			y: getCenterY()
		}
	}
	this.getCenter = getCenter;
	
	function getAlt() {
		return options.alt;
	}
	this.getAlt = getAlt;
	
}

module.exports = Image;