// Infinite scrolling functionality for Pinterest app index page
// var pinsList = document.getElementById('pins-list');
var $pinsList = $('#pins-list');
var numPins = $('.pin').length;
var listView = new infinity.ListView($pinsList);
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
	for (var i = 0; i < count; i++) {
		var randID = Math.floor( ( Math.random() * i ) + 1);
		var $item = $('#pin-id-' + i).clone().attr('id', 'pin-id-' + (count + i));
		listView.append($item);
	}
};

$(document).ready(function() {
	$pinsList.masonry({
		itemSelector: '.pin',
		columnWidth: '.pin-sizer',
		gutter: 20,
		fitWidth: true
	});
	
	// loadMore( numPins );
	// $firstNode = document.getElementById('pin-id-1');
	// $el = $firstNode.cloneNode(true).attr('id', 'pin-id-49');
	// console.log($el);
	listView.append($el);
});