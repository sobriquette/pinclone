// Infinite scrolling functionality for pinterest/index.html

// Masonry grid for Pins
var $pinsGrid = $('#pins-list');
var numPins = $('.pin').length;
var pinMaxWidth = 260;
var nextItem = 0;
var pinIDPrefix = 'pin-id-';

// Drag-and-drop grid using Packery and Draggabilly
var $dragContainer = $('#drag-container');
var nextWidgetId = $('.widget').length;
var $addWidgetBtn = $('#widgets-btn');

var makeElemDraggable = function( i, widget ) {
	var draggie = new Draggabilly( widget, function() {
		grid: [ 20, 20 ];
	});

	if (draggie.element.id === 'pins-widget') {
		initMasonry();
	}

	// bind drag events to Packery
	$dragContainer.packery( 'bindDraggabillyEvents', draggie );
};

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

	$dragContainer.find('.widget').each( makeElemDraggable );
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

var updateGrid = function( isDown ) {
	if ( isDown ) {
		loadMore();
	}
};

var infiniteScroll = function() {
	var gridH = $pinsGrid.outerHeight( true );
	var prvScrllTop = 0;
	var $this = $(this);
	var windowScrllTop = $this.scrollTop();
	var windowH = $this.outerHeight();

	if ( windowScrllTop >= gridH - windowH ) {
		updateGrid( true );
		infiniteScroll();
	}
};

var getRandomColor = function() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i ++) {
		color += letters[ Math.floor( Math.random() * 16 ) ];
	}

	return color;
}

var addNewWidgets = function() {
	var newWidget = '<div class="widget" id="widget-' + nextWidgetId +'"></div>';
	var $w = $(newWidget);

	// set a color for new widget
	$w.css('background-color', getRandomColor());

	$dragContainer.append( $w ).packery( 'appended', $w );
	nextWidgetId++;

	$w.each( makeElemDraggable );
};

$(document).ready(function() {
	initPackery();

	$addWidgetBtn.on( 'click', function() {
		addNewWidgets();
	});

	$(window).on('scroll', function() {
		infiniteScroll();
	});
});
