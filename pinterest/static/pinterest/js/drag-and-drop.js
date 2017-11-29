// drag-and-drop.js
'use strict';

function makeDraggableContainer( numElem ) {
	return {
		// properties
		numElem,
		
		// methods
		// makes a Draggability object out of the given widget
		makeElemDraggable( pckry ) {
			var $pckry = $(pckry);

			return function( i, widget ) {
				var draggie = new Draggabilly( widget, function() {
					grid: [ 20, 20 ];
				});

				// if (draggie.element.className.indexOf('infinite-scroll') != -1) {
				// 	this.initMasonry;
				// }

				// bind drag events to Packery
				$pckry.packery( 'bindDraggabillyEvents', draggie );	
			};
		},

		// initialize Packery and make its elements draggable
		initPackery( container, containerProps ) {
			var $pckry = $( container );
			$pckry.packery({
				itemSelector: containerProps.itemSelector,
				columnWidth: containerProps.columnWidth,
				gutter: containerProps.gutter

			});

			$pckry.find( containerProps.itemSelector ).each( this.makeElemDraggable( $pckry ) );
		},
		
		// generate a random color for the new widget
		getRandomColor() {
			var letters = '0123456789ABCDEF';
			var color = '#';
			for (var i = 0; i < 6; i ++) {
				color += letters[ Math.floor( Math.random() * 16 ) ];
			}

			return color;
		},

		createNewDivElem() {
			var newDivElem = '<div class="widget" id="widget-' + this.numElem +'"></div>'
			return newDivElem;
		},

		setElemColor( el ) {
			el.css('background-color', this.getRandomColor());
		},
		
		// do add widget and make it draggable actions
		addNewElems( container ) {
			var newWidget = this.createNewDivElem();
			var $w = $(newWidget);

			// set a color for new widget
			this.setElemColor( $w );

			container.append( $w ).packery( 'appended', $w );
			this.numElem++;

			$w.each( this.makeElemDraggable( container ) );
		}
	};
}