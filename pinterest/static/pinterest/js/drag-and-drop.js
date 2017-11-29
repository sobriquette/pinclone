// drag-and-drop.js

function makeDraggableContainer( container, numElem, containerProps, infiniteScrollProps ) {
	return {
		// properties
		container,
		numElem,
		containerProps,
		infiniteScrollProps,
		// methods

		// makes a Draggability object out of the given widget
		makeElemDraggable( i, widget ) {
			var draggie = new Draggabilly( widget, function() {
				grid: [ 20, 20 ];
			});

			if (draggie.element.class === 'infinite-scroll') {
				initMasonry();
			}

			// bind drag events to Packery
			this.container.packery( 'bindDraggabillyEvents', draggie );
		},

		// initialize Masonry grid for infinite scroll widget
		initMasonry() {
			$pinsGrid.masonry({
				itemSelector: this.infiniteScrollProps.itemSelector,
				columnWidth: this.infiniteScrollProps.columnWidth,
				gutter: this.infiniteScrollProps.gutter,
				fitWidth: this.infiniteScrollProps.fitWidth
			});

			$pinsGrid.imagesLoaded().progress( function() {
				$pinsGrid.masonry( 'layout' )
			});
		},

		// initialize Packery grid for drag and drop grid
		initPackery() {
			this.container.packery({
				itemSelector: this.containerProps.itemSelector,
				columnWidth: this.containerProps.columnWidth,
				gutter: this.containerProps.gutter

			});

			this.container.find(this.containerProps.itemSelector).each( this.makeElemDraggable );
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
		
		// do add widget and make it draggable actions
		addNewWidgets() {
			var newWidget = '<div class="widget" id="widget-' + this.numElem +'"></div>';
			var $w = $(newWidget);

			// set a color for new widget
			$w.css('background-color', this.getRandomColor());

			this.container.append( $w ).packery( 'appended', $w );
			this.numElem++;

			$w.each( this.makeElemDraggable );
		};
	};
}