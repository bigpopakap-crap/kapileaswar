/**
	Client-side script to keep HTML elements positioned correctly so that
	the "focus" of them is displayed if only a small portion of the image is visible
	
	Attributes to add to the <img> tag:
		data-k-imgpos="1" - activates on DOM load
		data-k-imgpos-x="{value}" - defines the "center of focus" for the x axis
									in percentage, without the percent sign
									default 50
		data-k-imgpos-y="{value}" - defines the "center of focus" for the y axis
									in percentage, without the percent sign
									default 50
*/
(function($) {
	
	var attrs = {
		imgpos: 'data-k-imgpos',
		imgposActive: 'data-k-imgpos-active',
		x: 'data-k-imgpos-x',
		y: 'data-k-imgpos-y',
		skinny: 'data-k-imgpos-skinny',
		short: 'data-k-imgpos-short'
	};
	
	var dflt = {
		x: '50',
		y: '50'
	}
	
	function limit(val, min, max) {
		if ((min !== null) && val < min) return min;
		else if ((max !== null) && val > max) return max;
		else return val;
	}
	
	/**
	 * One-time repositioning
	 */
	function kImgPos_once($img, $container) {
		//remove the skinny and short attributes for these calculations
		$img.attr(attrs.skinny, "0");
		$img.attr(attrs.short, "0");
		
		//get the "center of focus" of the img as defined by the attributes
		var centerX = limit($img.attr(attrs.x) || dflt.x, 0, 100);
		var centerY = limit($img.attr(attrs.y) || dflt.y, 0, 100);
		
		//get the width of the image
		var imgWidth = $img.width();
		var imgHeight = $img.height();
		
		//get the width of the container
		var containerWidth = $container.width();
		var containerHeight = $container.height();
		
		//add attributes for when img is smaller than container
		$img.attr(attrs.skinny, (imgWidth < containerWidth) ? "1" : "0");
		$img.attr(attrs.short, (imgHeight < containerHeight) ? "1" : "0");
		
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
	 * Activate smart positioning on these elements
	 */
	$.fn.kImgPos = function () {
		this.each(function() {
			var $img = $(this);
			var $container = $(this).parent();
			
			kImgPos_once($img, $container);
			
			/*
			 * attach to window resize event if it has not already
			 * been activated on this img
			 */
			if (!$img.attr(attrs.imgposActive)) {
				$(window).resize(function() {
					kImgPos_once($img, $container);
				});
				
				$img.load(function() {
					kImgPos_once($img, $container);
				});
				
				$img.attr(attrs.imgposActive, '1');
			}
		});
		
		return this;
	}
	
	//now activate on all components on load
	$(document).ready(function () {
		$('img[' + attrs.imgpos + '="1"]').kImgPos();
	});
	
})(jQuery);