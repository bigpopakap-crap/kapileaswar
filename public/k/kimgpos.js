/**
	Client-side script to keep HTML elements positioned correctly so that
	the "focus" of them is displayed if only a small portion of the image is visible
	
	TODO doc
	Attributes to add to the <img> tag:
		data-k-imgpos="1" - activates on DOM load
		data-k-imgpos-x="{value}" - defines the "center of focus" for the x axis
									in percentage, without the percent sign
									default 50
		data-k-imgpos-y="{value}" - defines the "center of focus" for the y axis
									in percentage, without the percent sign
									default 50
									
	TODO add attribute to specify the element to use as the container
*/
(function($) {
	
	var ATTR_PREFIX = 'data-k-imgpos-';
	var ATTRS = {
		docload: ATTR_PREFIX + 'docload',
		winresize: ATTR_PREFIX + 'winresize',
		centerx: ATTR_PREFIX + 'center-x',
		centery: ATTR_PREFIX + 'center-y',
		skinny: ATTR_PREFIX + 'skinny',
		short: ATTR_PREFIX + 'short'
	};
	
	var VALS = {
		TRUE: 1,
		FALSE: 0,
		DFLT_CENTER: 50,
		MIN_CENTER: 0,
		MAX_CENTER: 100
	}
	
	function limit(val, min, max) {
		/*
		 * TODO handle case that min > max
		 */
		if ((min !== null) && val < min) return min;
		else if ((max !== null) && val > max) return max;
		else return val;
	}
	
	function attrTrueSel(attr) {
		return '[' + attr + '="1"]';
	}
	
	/**
	 * One-time repositioning
	 */
	function kimgpos_once($img, $container) {
		//remove the skinny and short attributes for these calculations
		$img.attr(ATTRS.skinny, VALS.FALSE);
		$img.attr(ATTRS.short, VALS.FALSE);
		
		//get the "center of focus" of the img as defined by the attributes
		var centerX = limit(
						$img.attr(ATTRS.centerx) || VALS.DFLT_CENTER,
						VALS.MIN_CENTER,
						VALS.MAX_CENTER
					);
		var centerY = limit(
						$img.attr(ATTRS.centery) || VALS.DFLT_CENTER,
						VALS.MIN_CENTER,
						VALS.MAX_CENTER
					);
		
		//get the width of the image
		var imgWidth = $img.width();
		var imgHeight = $img.height();
		
		//get the width of the container
		var containerWidth = $container.width();
		var containerHeight = $container.height();
		
		//add attributes for when img is smaller than container
		$img.attr(ATTRS.skinny, (imgWidth < containerWidth) ? VALS.TRUE : VALS.FALSE);
		$img.attr(ATTRS.short, (imgHeight < containerHeight) ? VALS.TRUE : VALS.FALSE);
		
		//determine how much we need to shift the img to put the focus in the center
		var topGoal = containerHeight/2 - (centerX/100)*imgHeight;
		var leftGoal = containerWidth/2 - (centerY/100)*imgWidth;
		
		//the min offset we can have that will cause the image to leave white space
		var topMin = limit(containerHeight - imgHeight, null, 0);
		var leftMin = limit(containerWidth - imgWidth, null, 0);
		
		//offset values
		var top = limit(topGoal, topMin, 0) + 'px';
		var left = limit(leftGoal, leftMin, 0) + 'px';
		
		$img.css({
			position: 'relative',
			top: top,
			left: left
		});
	}
	
	/**
	 * Do smart positioning on these elements
	 */
	$.fn.kimgpos = function () {
		this.each(function() {
			var $img = $(this);
			var $container = $(this).parent();
			kimgpos_once($img, $container);
		});
		
		return this;
	}
	
	//now activate on all components on load
	$(document).ready(function() {
		var sel = attrTrueSel(ATTRS.docload);
		var $all = $(sel);
		$all.kimgpos();
		
		//Also attach to img load for these elements
		var $imgs = $('img' + sel);
		$imgs.load(function () {
			$imgs.kimgpos();
		});
	});
	
	//add an event on window resize
	$(window).resize(function() {
		$(attrTrueSel(ATTRS.winresize)).kimgpos();
	});
	
})(jQuery);