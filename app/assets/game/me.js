var phrases = ["Got em", "Yes", "Hurray", "You got this", "We got this", "It's cool", "Awesome", "Spectacular", "Fantabulous",
"So chill", "That's crazy", "No way", "That's amazing", "Go for it", "Get em champ", "Put me in coach", "It was easy", "Wau",
"TFTI", "Check it out", "Yeaaaahhhh", "Truuuu", "You got it", "Sounds good", "Good plan", "I hear ya", "Yup",
"I'm eating healthy", "Why not?!", "Porque no los dos", "Too good", "I like it", "I love it", "Do it again", "Face the wind",
"Young money", "All about it", "Ready to go", "I wanna know", "Do the right thing", "Chasing waterfalls", "???", "!!!", "...",
"Please respond", "In the rear with the gear", "Today's the day", "It's not rocket surgery", "Stay positive!", "It's a lifestyle",
"Or what??", "Same", "SAME", "Cool"];

var clickwait = new Date().getTime();
$("#me-picture").click(function() {
	if (clickwait > new Date().getTime())
		return;
	var name = "j"+Math.round(Math.random()*1000000).toString()
	$("body").append("<span class='phrase' id="+name+">"+phrases[Math.floor(Math.random()*phrases.length)]+"</span>");
	$("#"+name).css({
	  position:'absolute',
	  top: $(this).offset().top-20,
	  left: $(this).offset().left-30+(Math.random()*50),
	  zIndex: 100
	})
	clickwait = new Date().getTime()+250;
	animateClick($("#"+name), $(this).offset().top, 30)
});

/* 
 * http://stackoverflow.com/questions/5353934/check-if-element-is-visible-on-screen
 */
function checkVisible(elm, evalType) {
    evalType = evalType || "visible";

    var vpH = $(window).height(), // Viewport Height
        st = $(window).scrollTop() - vpH/3, // Scroll Top
        y = $(elm).offset().top,
        elementHeight = $(elm).height() - vpH;

    if (evalType === "visible") return ((y < (vpH + st)) && (y > (st - elementHeight)));
    if (evalType === "above") return ((y < (vpH + st)));
}

// auto text for mobile
$(window).scroll(function () {
	$(".p-item").each(function() {
		if (checkVisible($(this), "visible")) {
			$(this).addClass("p-overlay");
		} else {
			$(this).removeClass("p-overlay");
		}
	});
});

function animateClick(div, y, countdown) {
	div.css({
		top: y,
		opacity:countdown/10
	})
	if (countdown > 0) {
		setTimeout(function() {animateClick(div, y-2, countdown-1)}, 30)
	} else {
		div.remove()
	}
}
