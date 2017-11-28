// Infinite scrolling functionality for Pinterest app index page
var $pinsGrid = $('#pins-list');
var numPins = $('.pin').length;
var $dragContainer = $('#drag-container');
var pinMaxWidth = 260;
var nextItem = 0;
var pinIDPrefix = 'pin-id-';
var $addPinBtn = $('#add-pin');

var nextWidgetItem = 21;
var $wrapper = $("#widget-2");

var initMasonry = function () {
	$pinsGrid.masonry({
		itemSelector: '.pin',
		columnWidth: '.pin-sizer',
		gutter: 20,
		fitWidth: true
	});

	$pinsGrid.imagesLoaded().progress( function() {
		$pinsGrid.masonry( 'layout' )
	});
}

var initPackery = function() {
	$dragContainer.packery({
		itemSelector: '.widget',
		columnWidth: '.grid-sizer',
		gutter: '.gutter-sizer'

	});

	$dragContainer.find('.widget').each( function( i, widget ) {
		var draggie = new Draggabilly( widget, {
			handle: '.drag-handle'
		});
		
		if (draggie.element.id == 'widget-2') {
			initMasonry();
		}

		// bind drag events to Packery
		$dragContainer.packery( 'bindDraggabillyEvents', draggie );
	});
};

var clonePin = function() {
	var newID = numPins + nextItem;
	var randID = Math.floor( ( Math.random() * numPins ) + 1);
	var $item = document.getElementById( 'pin-id-' + randID );
	// update cloned pin id so all pin ids stay unique
	var clone = $item.cloneNode( true );
	clone.id = pinIDPrefix + newID;
	nextItem++;
	return clone;
};

var loadMore = function() {
	// clone enough nodes to fill the next row
	var end = Math.floor( $pinsGrid.outerWidth( true ) / pinMaxWidth );
	for ( var i = 0; i < end; i++ ) {
		// clonedPin = clonePin();
		var res = clonePin();
		var $cln = $( res );

		$pinsGrid.append( $cln ).masonry( 'appended', $cln );
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
	var gridH = $pinsGrid.outerHeight( true );
	var prvScrllTop = 0;

	$(window).on( 'scroll', function() {
		var $this = $(this);
		var scrllTop = $this.scrollTop();

		if ( scrllTop > prvScrllTop ) {
			if ( scrllTop - 350 >= gridH ) {
				updateGrid( true );
				gridH = gridH + (scrllTop - gridH);
			}
		} else {
			updateGrid( false );
		}
		prvScrllTop = scrllTop;
	})
};

var widget2Scroll = function () {
	var top = $wrapper.scrollTop();
	var ulH = $('#scroll-content').outerHeight();
	var wrapperH = $wrapper.outerHeight();

	if ( top >= ulH - wrapperH ) {
		for (var i = 0; i < 4; i++) {
			$('#scroll-content').append('<li>item ' + nextWidgetItem + '</li>');
		}
		nextWidgetItem++;
		widget2Scroll();
	}
};

$(document).ready(function() {
	initPackery();

	// $pinsGrid.masonry({
	// 	itemSelector: '.pin',
	// 	columnWidth: '.pin-sizer',
	// 	gutter: 20,
	// 	fitWidth: true
	// });

	// $pinsGrid.imagesLoaded().progress( function() {
	// 	$pinsGrid.masonry( 'layout' )
	// });

	$wrapper.on("scroll", function () {
		widget2Scroll();
	});


	doScroll();

	// $('#add-pin').on( 'click', function() {
	// 	var clonedPin = clonePin( numPins );
	// 	var $cln = $( clonedPin );
	// 	$pinsGrid.append( $cln ).masonry( 'appended', $cln );
	// });
});
