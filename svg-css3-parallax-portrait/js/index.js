
var isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
},

		//SET VARIABLES
		html = $('html'),
		container = $(".container"),
		instructions = $(".instructions"),

		face1 = $(".face-1"),
		face2 = $(".face-2"),
		face3 = $(".face-3"),
		face4 = $(".face-4"),
		face5 = $(".face-5"),
		face6 = $(".face-6"),

		buildLayers = $(".build-layers"),

		orientation,

		elementOffsetX,
		elementOffsetY,

		introHasRun = false,
		motionDetected = false,

		mouseCenterX,
		mouseCenterY,

		trackAreaX,
		trackAreaY,
		trackAreaCenterX,
		trackAreaCenterY,
		trackAreaRangeX,
		trackAreaRangeY,
		trackElementX,
		trackElementY,

		mobileTrackRangeX,
		mobileTrackRangeY,

		parallaxOn = false,

		deviceX,
		deviceY,

		f1_rate = 0.01,
		f1_rate_mobile = 0.7,
		f1X,
		f1Y,

		f2_rate = 0.015,
		f2_rate_mobile = 0.6,
		f2X,
		f2Y,

		f3_rate = 0.02,
		f3_rate_mobile = 0.5,
		f3X,
		f3Y,

		f4_rate = 0.025,
		f4_rate_mobile = 0.4,
		f4X,
		f4Y,

		f5_rate = 0.03,
		f5_rate_mobile = 0.3,
		f5X,
		f5Y,

		f6_rate = 0.035,
		f6_rate_mobile = 0.2,
		f6X,
		f6Y;

//READ DEVICE ORIENTATION
function readDeviceOrientation() {
	switch (window.orientation) {
		case 0:
			orientation = 'portrait';
			// Portrait
			break;

		case 180:
			orientation = 'portrait-upside-down';
			// Portrait (Upside-down)
			break;

		case -90:
			orientation = 'landscape-clockwise';
			// Landscape (landscape-clockwise)
			break;

		case 90:
			orientation = 'landscape-counter-clockwise';
			// Landscape  (Counterlandscape-clockwise)
			break;
	}
}

//GET SIZES
function getSizes() {
	//GET ORIENTATION
	readDeviceOrientation();

	elementOffsetX = container.offset().left;
	elementOffsetY = container.offset().top;

	trackAreaX = container.width();
	trackAreaY = container.height();

	trackAreaCenterX = trackAreaX / 2;
	trackAreaCenterY = trackAreaY / 2;

	//DESKTOP TRACK RANGE CODE
	trackAreaRangeX = (trackAreaX * 69 / 100) / 2;
	if (trackAreaX > trackAreaY * 2) {
		trackAreaRangeX = (trackAreaX * 45 / 100) / 2;
	}
	//MATH FOR RESPONSIVELY TRACKING AREA
	if (trackAreaX > trackAreaY) {
		trackAreaRangeY = (trackAreaY * 90 / 100) / 2;
	} else {
		trackAreaRangeY = (trackAreaY * 70 / 100) / 2;
		if (trackAreaY > trackAreaX * 2) {
			trackAreaRangeY = (trackAreaY * 60 / 100) / 2;
		}
	}

	//MOBILE TRACK RANGE CODE
	//Check orientation
	mobileTrackRangeX = (trackAreaX / 30);
	mobileTrackRangeY = (trackAreaY / 40);
}

//MOVE IMAGES
function moveImages() {
	if (introHasRun && f1X > 1 || f1Y > 1) {
		motionDetected = true;
	}

	face1.css({
		"transform": "translateZ(0px) translate(" + f1X + "px, " + f1Y + "px)"
	});
	face2.css({
		"transform": "translateZ(0px) translate(" + f2X + "px, " + f2Y + "px)"
	});
	face3.css({
		"transform": "translateZ(0px) translate(" + f3X + "px, " + f3Y + "px)"
	});
	face4.css({
		"transform": "translateZ(0px) translate(" + f4X + "px, " + f4Y + "px)"
	});
	face5.css({
		"transform": "translateZ(0px) translate(" + f5X + "px, " + f5Y + "px)"
	});
	face6.css({
		"transform": "translateZ(0px) translate(" + f6X + "px, " + f6Y + "px)"
	});
}

//IF ON MOBILE DEVICES
if (isMobile.any()) {
	$('.move-mouse').remove();
	window.addEventListener("deviceorientation", function(e) {
		if (parallaxOn) {
			// Z = The compass direction - will return a value between 0 and 360
			// alpha = Math.round(e.alpha * 100)/100;
			// X = Side to side value - will return a value between -180 and 180
			// deviceY= Math.round(e.deviceY* 100)/100 - 30;
			// Y = Front to back value - will return a value between -90 and 90
			// gamma = Math.round(e.gamma * 100)/100;

			switch (orientation) {
				case 'portrait':
					// Y = Front to back value - will return a value between -90 and 90
					deviceY = Math.round(e.beta * 100) / 100 - 30;
					// X = Side to side value - will return a value between -180 and 180
					deviceX = Math.round(e.gamma * 100) / 100;
					break;

				case 'portrait-upside-down':
					// X = Side to side value - will return a value between -180 and 180
					deviceY = (Math.round(e.beta * 100) / 100 + 30) * -1;
					// Y = Front to back value - will return a value between -90 and 90
					deviceX = (Math.round(e.gamma * 100) / 100) * -1;
					break;

				case 'landscape-clockwise':
					deviceX = (Math.round(e.beta * 100) / 100) * -1;
					deviceY = Math.round(e.gamma * 100) / 100 - 30;
					break;

				case 'landscape-counter-clockwise':
					deviceX = Math.round(e.beta * 100) / 100;
					deviceY = (Math.round(e.gamma * 100) / 100 + 30) * -1;
					break;
			}

			trackElementX = deviceX;
			trackElementY = deviceY;

			//IF THE DEVICE ORIENTATION DEGREE IS WITHIN THE TRACK RANGE
			if (Math.abs(deviceX) < mobileTrackRangeX) { 
				f6X = f6_rate_mobile * trackElementX;
				f5X = f5_rate_mobile * trackElementX;
				f4X = f4_rate_mobile * trackElementX;
				f3X = f3_rate_mobile * trackElementX;
				f2X = f2_rate_mobile * trackElementX;
				f1X = f1_rate_mobile * trackElementX;
			}
			if(Math.abs(deviceY) < mobileTrackRangeY){
				f6Y = f6_rate_mobile * trackElementY;
				f5Y = f5_rate_mobile * trackElementY;
				f4Y = f4_rate_mobile * trackElementY;
				f3Y = f3_rate_mobile * trackElementY;
				f2Y = f2_rate_mobile * trackElementY;
				f1Y = f1_rate_mobile * trackElementY;
			}
			//				setTimeout(function() {
			//					window.requestAnimationFrame(moveImages);
			//				}, 1000 / 60);
			window.requestAnimationFrame(moveImages);
		}
	}, true);

} else {
	$('.move-device').remove();
	//IF ON MOUSE DEVICE
	container.on('mousemove', function(e) {
		if (parallaxOn) {
			mouseCenterX = e.pageX - trackAreaCenterX;
			mouseCenterY = e.pageY - trackAreaCenterY;

			trackElementX = mouseCenterX - elementOffsetX;
			trackElementY = mouseCenterY - elementOffsetY;

			//IF MOUSE POSITION IS WITHIN THE TRACK RANGE
			if (Math.abs(mouseCenterX) < Math.abs(trackAreaRangeX)) {
				f1X = f1_rate * trackElementX;
				f2X = f2_rate * trackElementX;
				f3X = f3_rate * trackElementX;
				f4X = f4_rate * trackElementX;
				f5X = f5_rate * trackElementX;
				f6X = f6_rate * trackElementX;
			}

			if (Math.abs(mouseCenterY) < Math.abs(trackAreaRangeY)) {
				f1Y = f1_rate * trackElementY;
				f2Y = f2_rate * trackElementY;
				f3Y = f3_rate * trackElementY;
				f4Y = f4_rate * trackElementY;
				f5Y = f5_rate * trackElementY;
				f6Y = f6_rate * trackElementY;
			}
			//				setTimeout(function() {
			//					window.requestAnimationFrame(moveImages);
			//				}, 1000 / 60);
			window.requestAnimationFrame(moveImages);
		}
	});
}

//CHECK IF THERE HAS BEEN MOVEMENT EVERY 2 SECONDS
function hasDeviceMoved() {
	setInterval(function() {
		if (!motionDetected && parallaxOn) {
			instructions.addClass('show');
			//				console.log('motion has not been detected.');
		} else {
			instructions.removeClass('show');
			motionDetected = true;
		}
	}, 500);
}

$(window).resize(getSizes);

$(window).on("orientationchange", function() {
	getSizes();
});

//IF THE LAST ANIMATION HAS RUN START TO CHECK FOR MOVEMENT
$('.description p').one('transitionend', function() {
	//		console.log('.description has finished animating');
	buildLayers.remove();
	introHasRun = true;
	parallaxOn = true;
	setTimeout(function() {
		hasDeviceMoved();
	}, 2000);
});
setTimeout(function() {
html.removeClass('loading').addClass('face-build');
	setTimeout(function(){
		$('.preloader-overlay').remove();
	}, 1000);
}, 1000);
getSizes();