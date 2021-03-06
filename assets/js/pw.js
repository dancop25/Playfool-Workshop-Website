$(document).ready(function() { 


// Variables
// ------------------------------------

	var isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true; 	

	var $window = $(window),
	$block = $(".block"),
    $block_inner = $(".block_inner"),
    $banner = $("#banner"),
    $bg_vid = $("#bg_vid"),
    $mobile_bg = $("#mobile_bg"),
	lineWidth,
	frequency,
	amplitude,
	squiggleHeight,
	p = function (x,y) {
		return { x:x, y:y };
	};	


// Functions
// ------------------------------------

	 // Adjust the view height property to current window size.
	function changeSectionHeight() {
		viewportHeight = $window.height();
        $banner.css('height', viewportHeight*0.95);
    };
    

    // Change bg for mobile.
    // function changeMobileBG() {
    // 	if (isMobile == true) {
    // 		$bg_vid.css('display', 'none');
    // 		$mobile_bg.css('display', 'block');
    // 	};
    // };


	// Squiggly Line
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
		};
	};

	function drawSquigglyLine() {
		$(".squiggly_line").each(function(i, data) {
			
			lineWidth = 3.5; 
			amplitude = 4.5;
			$(this).css('width', $block_inner.width());
			frequency = $(this).width() * (1/22);

			if (isMobile) { 
				var mobileRatio = 1.4; 
				lineWidth = lineWidth/ mobileRatio; 
				amplitude = amplitude / mobileRatio;
				frequency = frequency * mobileRatio;
			} 

			squiggleHeight = (amplitude * 2) + lineWidth + 1;

			$(this).css('height', squiggleHeight);

			var ctx = $(this)[0].getContext('2d');
		    ctx.canvas.width  = $(this).width()*2;
			ctx.canvas.height = $(this).height()*2;
			ctx.scale(2,2);	// Double the dimensions for higher resolution.

			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = "#f32d83";
			ctx.beginPath();
			ctx.wavy(p(lineWidth/2, $(this).height()/2), p($(this).width()-(lineWidth/2), $(this).height()/2), frequency, amplitude, 1);	
			ctx.stroke();
		});
	};


	// Change font size for en website
	function enFontSize() {
		var fontSizeFactor = 1.1;
		if (($('body#en').length > 0)) {
			console.log
			$('body').find('p, a, li').each(function() {
				var fontSize = $(this).css('font-size');
				var newFontSize = parseInt(fontSize,10) * fontSizeFactor; 
				$(this).css('font-size', newFontSize);
			});
		};
	};
	enFontSize();


// Calling Functions
// ------------------------------------

	// Call Functions
	changeSectionHeight();
	// changeMobileBG();
	drawSquigglyLine();

	// Reload Functions on Window Resize 
	$window.resize(function () {
		changeSectionHeight();
		// changeMobileBG();
        drawSquigglyLine();
    });


});