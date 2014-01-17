
setTime();
var interval = setInterval(setTime,1000);

function setTime() {

	// Get Date 
	var now = new Date();
	var hour = now.getHours() >= 10 ? now.getHours() : "0" + now.getHours();
	var min = now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes();
	var sec = now.getSeconds() >= 10 ? now.getSeconds() : "0" + now.getSeconds();
	var date_string = hour + "" + min + "" + sec;

	// Change Time
	var digits = document.querySelectorAll('.digit');
	for ( var i = 0; i < digits.length; i++ ) {
		var digit = digits[i];
		var classes = digit.classList;
		
		for ( var k = 0; k < classes.length; k++ ){
			if ( classes[k].indexOf('js') >= 0 ){
				digit.classList.remove(classes[k]);
			}
		}
		digit.classList.add("js-digit--" + date_string.charAt(i));
	}

}