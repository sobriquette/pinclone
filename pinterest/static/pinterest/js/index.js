// Infinite scrolling functionality for Pinterest app index page
// var pinsList = document.getElementById('pins-list');
var $pinsList = $('#pins-list');
var numPins = $('.pin').length;
var nextItem = 1;

var removePin = function( id ) {
	$('#pin-id-' + id).remove();
};

var updatePinsList = function( container, from, to, isDown ) {
	console.log('update');
	if (isDown) {
		remove(from);
		container.append(create(to + 1));
	} else {
		remove(to);
		container.append(create(from - 1));
	}
};

var loadMore = function( count ) {
	console.log("loadMore");
	for (var i = 0; i < count; i++) {
		var randID = Math.floor( ( Math.random() * i ) + 1);
		var item = $('#pin-id-' + i).clone();
		pinsList.append(item);
	}
};

$(document).ready(function() {
	$pinsList.masonry({
		itemSelector: '.pin',
		columnWidth: '.pin-sizer',
		gutter: 20,
		fitWidth: true
	});
	// pinsList.addEventListener('scroll', loadMore( numPins ));
});