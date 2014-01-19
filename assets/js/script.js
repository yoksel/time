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

var head = document.querySelector('head');
head.insertAdjacentHTML('beforeend', '<style id="coloring"></style>');
var style_container = document.getElementById("coloring");

var color_step = 0;
var color_steps_max = 12;
var color_period = 1; // time out before changing color
var color_time_counter = 0;
var color_class = "js-color--active";

var digits = document.querySelectorAll('.digit');
var digit_item_class = ".digit__item";
var digits_items = document.querySelectorAll(".digit__item");
var dottes = document.querySelector(".dottes");
var dottes_items = document.querySelectorAll(".dottes__item");

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
	for ( var i = 0; i < digits.length; i++ ) {
		
		var digit = digits[i];
		var digit_value = +date_string.charAt(i);

		remove_class_from_items (digit, color_class);
		remove_class_from_elem(dottes, color_class);

		var digit_elems_classes = digits_map[digit_value];

		if ( digit_elems_classes.length > 0 ){
			for ( var l = 0; l < digit_elems_classes.length; l++ ){
				var item = digit.querySelector(digit_elems_classes[l]);
				item.classList.add( color_class  );
				}
		}	
		
	}

	dottes.classList.add( color_class );

	// Change colors
	if ( color_time_counter == color_period ){
		color_time_counter = 0;
		change_color_by_style();
	}
	else {
		color_time_counter++;
	}
	
}

function add_class_to_items ( elem ) {
	var items = elem.querySelectorAll(".item");

	for ( var i = 0; i < items.length; i++ ){
		items[i].classList.add ( class_color );
	}
}

function remove_class_from_items ( elem, class_prefix ) {
	var items = elem.querySelectorAll(".item");

	for ( var i = 0; i < items.length; i++ ){
		remove_class_from_elem(items[i], class_prefix);
	}
}

function remove_class_from_elem ( elem, class_prefix ) {
	var classes = elem.classList;
			
	for ( var k = 0; k < classes.length; k++ ){
		if ( classes[k].indexOf(class_prefix) >= 0 ){
			elem.classList.remove(classes[k]);
		}
	}
}

function change_color_by_style(){

	var hue_value = 360 / color_steps_max * color_step;
	var bright_value = 50; 
	
	var current_color = "hsl(" + hue_value + ", 70%, " + bright_value + "%)";
	var color_class_local = "." + color_class;

	var styles = color_class_local + " { background: " + current_color + "; }";
		styles += color_class_local + ":before, " + color_class_local + ":after { border-color: " + current_color + "; }";

	style_container.innerHTML = styles;

	if ( color_step < color_steps_max ){
		color_step++;
	}
	else {
		color_step = 0;
	}
}