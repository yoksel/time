// console.log("Hello");

var digits_map = [[".item--1", ".item--2", ".item--3", ".item--5", ".item--6", ".item--7"],
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

var color_step = 0;
var color_period = 5;
var color_time_counter = 0;
var color_prefix = "js-color";

var digits = document.querySelectorAll('.digit');
var dottes = document.querySelector(".dottes");

setTime();
var interval = setInterval(setTime,1000);	

var colors = ["crimson", "orange", "gold", "yellowgreen", "steelblue", "purple"];

var class_color = color_prefix + "--" + colors[colors.length - 1];

function setTime() {

	// Get Date 
	var now = new Date();
	var hour = now.getHours() >= 10 ? now.getHours() : "0" + now.getHours();
	var min = now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes();
	var sec = now.getSeconds() >= 10 ? now.getSeconds() : "0" + now.getSeconds();
	var date_string = hour + "" + min + "" + sec;

	// Change Time
	
	for ( var i = 0; i < digits.length; i++ ) {
		
		var digit = digits[i];
		var digit_value = +date_string.charAt(i);

		// console.log	(i + ": -- DIGIT:" + digit_value);

		remove_class_from_items (digit, color_prefix);

		var digit_elems_classes = digits_map[digit_value];

		if ( digit_elems_classes.length > 0 ){
			for ( var l = 0; l < digit_elems_classes.length; l++ ){
				var item = digit.querySelector(digit_elems_classes[l]);
				item.classList.add( class_color );
				}
		}	
		
		dottes.classList.add( class_color );
	}

	// Change colors
	if ( color_time_counter == color_period ){
		color_time_counter = 0;
		change_color();
	}
	else {
		color_time_counter++;
	}
	
	
}

function remove_class_from_items ( elem, class_prefix ) {
	// console.log(elem);
	var items = elem.querySelectorAll(".item");

	for ( var i = 0; i < items.length; i++ ){
		remove_class_from_elem(items[i], class_prefix);
	}
	// remove_class_from_elem(".dottes", class_prefix);

}

function remove_class_from_elem ( elem, class_prefix ) {
	// console.log ("remove_class_from_elem");
	var classes = elem.classList;
			
	for ( var k = 0; k < classes.length; k++ ){
		if ( classes[k].indexOf(class_prefix) >= 0 ){
			elem.classList.remove(classes[k]);
		}
	}
}

function change_color(){
	class_color = color_prefix + "--" + colors[color_step];
	remove_class_from_elem ( dottes, color_prefix );
	dottes.classList.add ( class_color );
	
	if ( color_step < colors.length - 1 ){
		color_step++;
	}
	else {
		color_step = 0;
	}
}