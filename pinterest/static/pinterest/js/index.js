// Infinite scrolling functionality for Pinterest app index page
var $grid = $('#pins-list');
var numPins = $('.pin').length;
var pinMaxWidth = 260;
var nextItem = 0;
var pinIDPrefix = 'pin-id-';
var $addPinBtn = $('#add-pin');

var clonePin = function() {
	var newID = numPins + nextItem;
	var randID = Math.floor( ( Math.random() * numPins ) + 1);
	var $item = document.getElementById( 'pin-id-' + randID );
	// update cloned pin id so all pin ids stay unique
	var clone = $item.cloneNode( true );
	clone.id = pinIDPrefix + newID;
	nextItem++;
	return clone;
}

var loadMore = function() {
	// clone enough nodes to fill the next row
	var end = Math.floor( $grid.outerWidth( true ) / pinMaxWidth );
	for ( var i = 0; i < end; i++ ) {
		// clonedPin = clonePin();
		var res = clonePin();
		var $cln = $( res );

		$grid.append( $cln ).masonry( 'appended', $cln );
	}
};

var removePins = function( id ) {
	console.log("need to remove pins!");
};

var updateGrid = function( isDown ) {
	if ( isDown ) {
		loadMore();
	} else {
		removePins();
	}
};

var doScroll = function() {
	var gridH = $grid.outerHeight( true );
	var prvScrllTop = 0;

	$(window).on( 'scroll', function() {
		var $this = $(this);
		var scrllTop = $this.scrollTop();

		if ( scrllTop > prvScrllTop ) {
			if ( scrllTop - 100 >= gridH ) {
				updateGrid( true );
				gridH = gridH + (scrllTop - gridH);
			}
		} else {
			updateGrid( false );
		}
		prvScrllTop = scrllTop;
	})
};

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

	doScroll();

	// $('#add-pin').on( 'click', function() {
	// 	var clonedPin = clonePin( numPins );
	// 	var $cln = $( clonedPin );
	// 	$grid.append( $cln ).masonry( 'appended', $cln );
	// });
});
