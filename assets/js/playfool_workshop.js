$(document).ready(function() { 

	var $window = $(window),
    $block_inner = $(".block_inner"),
    $course_desc_workshop = $(".-workshop > .course_desc"),
    $course_desc_facilitator = $(".-facilitator > .course_desc"),
	lineWidth,
	frequency,
	amplitude,
	squiggleHeight,

	
	p = function (x,y) {
		return { x:x, y:y };
	};	

	// Redraw Squiggly Line on browser resize. 
	$window.resize(function () {
        drawSquigglyLine();
        changeWorkshopHeight();
    });

	
	function changeWorkshopHeight() {
		var facilitator_height = $course_desc_facilitator.css('height');
	    $course_desc_workshop.css('height', facilitator_height);
	}
	changeWorkshopHeight();


	CanvasRenderingContext2D.prototype.wavy = function(from, to, frequency, amplitude, step, negative) 
	{ 
		var cx = 0, cy = 0, 
			fx = from.x, fy = from.y, 
			tx = to.x, ty = to.y,
			i = 0, waveOffsetLength = 0,
		
			ang = Math.atan2(ty - fy, tx - fx),
			distance = Math.sqrt((fx - tx) * (fx - tx) + (fy - ty) * (fy - ty)),
			a = amplitude * (!negative ? 1 : -1),
			f = Math.PI * frequency;
		
		for (i; i <= distance; i += step) 
		{
			waveOffsetLength = Math.sin((i / distance) * f) * a;
			cx = from.x + Math.cos(ang) * i + Math.cos(ang - Math.PI/2) * waveOffsetLength;
			cy = from.y + Math.sin(ang) * i + Math.sin(ang - Math.PI/2) * waveOffsetLength;
			i > 0 ? this.lineTo(cx, cy) : this.moveTo(cx, cy);
		}
	}


	function drawSquigglyLine() {
		$(".squiggly_line").each(function(i, data) {
			lineWidth = 5;
			amplitude = 5;
			squiggleHeight = (amplitude * 2) + lineWidth + 1;

			// if (squigClass == ".shortSquig1") {
			// 	$squigCanvas.css('width', 175);
			// } else {
			// 	$squigCanvas.css('width', $block_inner.width());

			$(this).css('width', $block_inner.width());
			$(this).css('height', squiggleHeight);
			frequency = $(this).width() * (1/26);

			var ctx = $(this)[0].getContext('2d');
		    ctx.canvas.width  = $(this).width()*2;
			ctx.canvas.height = $(this).height()*2;
			ctx.scale(2,2);		// Double the dimensions for higher resolution.

			// ctx.lineCap = 'round';
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = "#f32d83";
			ctx.beginPath();
			ctx.wavy(p(lineWidth/2, $(this).height()/2), p($(this).width()-(lineWidth/2), $(this).height()/2), frequency, amplitude, 1);	
			ctx.stroke();
		});
	};
	drawSquigglyLine();


})(jQuery);