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
	columnWidth : '.pin-sizer',
	gutter : 20,
	fitWidth: true,
	numElem: numPins,
	elemIDPrefix: pinIDPrefix
};

// wrapper for infinite scrolling functionality
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

// Wrapper for drag-and-drop functionality
var draggableContainer = makeDraggableContainer( numWidgets );

$(document).ready(function() {
	draggableContainer.initPackery( $drgContainer, drgContainerProps );
	infiniteScrollGrid.initMasonry();

	$addWidgetBtn.on( 'click', function() {
		draggableContainer.addNewElems( $drgContainer );
	});

	$(window).on('scroll', function() {
		var $this = $(this);
		infiniteScrollGrid.infiniteScroll( $this );
	});
});
