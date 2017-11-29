// index.js
'use strict';

// Properties for pin scrolling
var $pinsGrid = $('#pins-list');
var numPins = $('.pin').length;
var pinIDPrefix = 'pin-id-';

// Settings for Masonry.js
var infiniteScrollProps = {
	gridSelector : $pinsGrid,
	itemSelector : '.pin',
	numElem: numPins,
	elemIDPrefix: pinIDPrefix,
	columnWidth : '.pin-sizer',
	gutter : 20,
	fitWidth: true
};

// Instantiate the infinite scroll grid
var infiniteScrollGrid = makeInfiniteGrid( infiniteScrollProps );

// Properties for drag-and-drop enabled container
var $drgContainer = $('#drag-container');
var numWidgets = $('.widget').length;
var $addWidgetBtn = $('#widgets-btn');

// Settings for Packery.js
var drgContainerProps = {
	itemSelector : '.widget',
	columnWidth : '.grid-sizer',
	gutter : '.gutter-sizer'
};

// Instantiate drag and drop container
var draggableContainer = makeDraggableContainer( numWidgets );

$(document).ready(function() {
	draggableContainer.initPackery( $drgContainer, drgContainerProps ); // Initializes the packery grid
	infiniteScrollGrid.initMasonry(); // Initializes the masonry grid

	// Add new widgets to the draggable container
	$addWidgetBtn.on( 'click', function() {
		draggableContainer.addNewElems( $drgContainer );
	});

	// Do infinite scrolling when we reach the bottom of the browser window
	$(window).on('scroll', function() {
		var $this = $(this);
		infiniteScrollGrid.infiniteScroll( $this );
	});
});
