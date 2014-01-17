var prev = 0;
var digits_map = [
	[".item--1", ".item--2", ".item--3", ".item--5", ".item--6", ".item--7"],
	[".item--3", ".item--6"],
	[".item--1", ".item--3", ".item--4", ".item--5", ".item--7"],
	[".item--1", ".item--3", ".item--4", ".item--6", ".item--7"],
	[".item--2", ".item--3", ".item--4", ".item--6"],
	[".item--1", ".item--2", ".item--4", ".item--6", ".item--7"],
	[".item--1", ".item--2", ".item--4", ".item--5", ".item--6", ".item--7"],
	[".item--1", ".item--3", ".item--6"],
	[".item--1", ".item--2", ".item--3", ".item--4", ".item--5", ".item--6", ".item--7"],
	[".item--1", ".item--2", ".item--3", ".item--4", ".item--6", ".item--7"]
	];

setTime();
var interval = setInterval(setTime,1000);	

var class_color = "js-color--crimson";

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
		var digit_value = +date_string.charAt(i);

		if ( digit_value != prev ){
			console.log ("-- Digit: " + digit_value);

			var digit_elems_classes = digits_map[digit_value];

			console.log(digit_elems_classes);

			if ( digit_elems_classes.length > 0 ){
				for ( var l = 0; l < digit_elems_classes.length; l++ ){
					var item = digit.querySelector(digit_elems_classes[l]);
					console.log ( item );
					remove_class_from_list (item, "js-color");
					item.classList.add( class_color );
					}
			}		

			// remove_class_from_list (digit, "js-digit");
		
			// digit.classList.add("js-digit--" + date_string.charAt(i));
			// prev = digit_value;
		}
	}

}

function remove_class_from_list (elem, class_prefix) {
	var classes = elem.classList;
			
	for ( var k = 0; k < classes.length; k++ ){
		if ( classes[k].indexOf(class_prefix) >= 0 ){
			elem.classList.remove(classes[k]);
		}
	}
}