/**
	Client-side script to keep HTML elements positioned correctly
	
	Attributes to add to DOM elements:
		data-k-imgpos="1" - activates on DOM load
		data-k-imgpos-x="<value>" - defines the "center of focus" for the x axis
									in percentage, without the percent sign
									default 50
		data-k-imgpos-y="<value>" - defines the "center of focus" for the y axis
									in percentage, without the percent sign
									default 50
*/
(function($) {
	
	var attrs = {
		imgpos: 'data-k-imgpos',
		x: 'data-k-imgpos-x',
		y: 'data-k-imgpos-y',
		//TODO add option to attach to window.resize event
	};
	
	var dflt = {
		x: '50',
		y: '50'
	}
	
	/**
	 * Activate smart positioning on these elements
	 */
	$.fn.kImgPos = function (options) {
		this.each(function() {
			var $this = $(this);
			var x = $this.attr(attrs.x) || dflt.x;
			var y = $this.attr(attrs.y) || dflt.y;
			
			console.log($this + 'imgpos: ' + x + ', ' + y);
			//TODO actually do this
		});
		
		return this;
	}
	
	//now activate on all components on load
	$(document).ready(function () {
		$('[' + attrs.imgpos + '="1"]').kImgPos();
	});
	
})(jQuery);