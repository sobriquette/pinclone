// index.js
// Infinite scrolling functionality for pinterest/index.html

// Masonry grid for Pins
var $pinsGrid = $('#pins-list');
var numPins = $('.pin').length;
var pinIDPrefix = 'pin-id-';
var infiniteScrollGrid = makeInfiniteGrid( 
	$pinsGrid, 
	numPins, 
	pinIDPrefix
);
var infiniteScrollProps = {
	itemSelector : '.pin',
	columnWidth : '.pin-sizer',
	gutter : 20,
	fitWidth: true
};

// Drag-and-drop grid using Packery and Draggabilly
var $drgContainer = $('#drag-container');
var numWidgets = $('.widget').length;
var $addWidgetBtn = $('#widgets-btn');
var drgContainerProps = {
	itemSelector: '.widget',
	columnWidth: '.grid-sizer',
	gutter: '.gutter-sizer'
};
var draggableContainer = makeDraggableContainer( 
	$drgContainer, 
	numWidgets, 
	drgContainerProps, 
	infiniteScrollProps
);

$(document).ready(function() {
	initPackery();

	$addWidgetBtn.on( 'click', function() {
		addNewWidgets();
	});

	$(window).on('scroll', function() {
		infiniteScroll();
	});
});
