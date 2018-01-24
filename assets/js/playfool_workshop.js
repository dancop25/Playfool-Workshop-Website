$(document).ready(function() { 

	var $window = $(window),
    $innerBox = $(".innerBox"),
    $squigCanvas,
	
	lineWidth,
	frequency,
	amplitude,
	squiggleHeight,
	
	p = function (x,y) {
		return { x:x, y:y };
	};	

	// Redraw Squiggly Line on browser resize. 
	$window.resize(function () {
        drawSquigglyLine(".squig1");
		drawSquigglyLine(".squig2");
		drawSquigglyLine(".shortSquig1");
    });

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

	function drawSquigglyLine(squigClass) {
		$squigCanvas = $(squigClass);
		lineWidth = 5;
		amplitude = 5;
		squiggleHeight = (amplitude * 2) + lineWidth + 1;

		if (squigClass == ".shortSquig1") {
			$squigCanvas.css('width', 175);
		} else {
			$squigCanvas.css('width', $innerBox.width());
		}
		$squigCanvas.css('height', squiggleHeight);
		frequency = $squigCanvas.width() * (1/26);

		var ctx = $squigCanvas[0].getContext('2d');
	    ctx.canvas.width  = $squigCanvas.width()*2;
		ctx.canvas.height = $squigCanvas.height()*2;
		ctx.scale(2,2);		// Double the dimensions for higher resolution.

		// ctx.lineCap = 'round';
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = "#f32d83";
		ctx.beginPath();
		ctx.wavy(p(lineWidth/2, $squigCanvas.height()/2), p($squigCanvas.width()-(lineWidth/2), $squigCanvas.height()/2), frequency, amplitude, 1);	
		ctx.stroke();
	}
	drawSquigglyLine(".squig1");
	drawSquigglyLine(".squig2");
	drawSquigglyLine(".shortSquig1");

})(jQuery);