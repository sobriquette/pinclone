// Infinite scrolling functionality for Pinterest app index page
// var grid = document.getElementById('pins-list');
var $grid = $('#pins-list');
var $pinsContainer = document.getElementById('pins-list');
var numPins = $('.pin').length;
var nextItem = 1;
var $addPinBtn = $('#add-pin');

var loadMore = function( count ) {
	for ( var i = 1; i <= count; i++ ) {
		console.log("iterator: " + i);
		// var randID = Math.floor( ( Math.random() * i ) + 1);
		// var $item = $('#pin-id-' + i).clone().attr('id', 'pin-id-' + (count + i));
		var $item = document.getElementById('pin-id-' + i);
		var clone = $item.cloneNode(true);
		$pinsContainer.appendChild(clone);
	}
};

var clonePin = function( range ) {
	var randID = Math.floor( ( Math.random() * range ) + 1);
	var $item = document.getElementById( 'pin-id-' + randID );
	var clone = $item.cloneNode( true );
	return clone;
	// $pinsContainer.appendChild( clone );
}

$(document).ready(function() {
	$grid.masonry({
		itemSelector: '.pin',
		columnWidth: '.pin-sizer',
		gutter: 20,
		fitWidth: true
	});

	$grid.imagesLoaded().progress( function() {
		$grid.masonry( 'layout' )
	});
	// $grid.on('scroll', loadMore( numPins ));
	
	$('#add-pin').on('click', function() {
		clonedPin = clonePin( numPins );
		$cln = $( clonedPin );
		$grid.append( $cln ).masonry( 'appended', $cln );
	});
});
