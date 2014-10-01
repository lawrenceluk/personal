$("#me-picture").click(function() {

});

/* 
 * http://stackoverflow.com/questions/5353934/check-if-element-is-visible-on-screen
 */
function checkVisible(elm, evalType) {
    evalType = evalType || "visible";

    var vpH = $(window).height(), // Viewport Height
        st = $(window).scrollTop() - 280, // Scroll Top
        y = $(elm).offset().top,
        elementHeight = $(elm).height() - vpH;

    if (evalType === "visible") return ((y < (vpH + st)) && (y > (st - elementHeight)));
    if (evalType === "above") return ((y < (vpH + st)));
}

$(window).scroll(function () {
	$(".p-item").each(function() {
		if (checkVisible($(this), "visible")) {
			$(this).addClass("p-overlay");
		} else {
			$(this).removeClass("p-overlay");
		}
	});
});