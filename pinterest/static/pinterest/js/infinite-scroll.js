// infinite-scroll.js
'use strict';

function makeInfiniteGrid( infiniteScrollProps ) {
	return {
		// properties
		infiniteScrollProps,
		elemMaxWidth: 260,
		nextItem: 0,
		// methods
		// initialize Masonry grid for infinite scroll widget
		initMasonry() {
			var props = this.infiniteScrollProps;
			var $msnry = $( infiniteScrollProps.gridSelector );

			$msnry.masonry({
				itemSelector: infiniteScrollProps.itemSelector,
				columnWidth: infiniteScrollProps.columnWidth,
				gutter: infiniteScrollProps.gutter,
				fitWidth: infiniteScrollProps.fitWidth
			});

			$msnry.imagesLoaded().progress( function() {
				$msnry.masonry( 'layout' );
			});
		},

		// pin cloning
		clonePin() {
			var props = this.infiniteScrollProps;
			// pick a random pin to clone
			var randID = Math.floor( ( Math.random() * props.numElem ) + 1);
			var $item = document.getElementById( props.elemIDPrefix + randID );
			var clone = $item.cloneNode( true );
			// update cloned pin id so all pin ids stay unique
			var newID = this.numPins + this.nextItem;
			clone.id = this.elemIDPrefix + newID;
			this.nextItem++;

			return clone;
		},
		
		// load more pins and add them to masonry grid
		loadMorePins() {
			// clone enough nodes to fill the next row
			var $grid = $( this.infiniteScrollProps.gridSelector );
			var end = Math.floor( $grid.outerWidth( true ) / this.elemMaxWidth );

			for ( var i = 0; i < end; i++ ) {
				var res = this.clonePin();
				var $cln = $( res );

				$grid.append( $cln ).masonry( 'appended', $cln );
			}
		},
		
		// update the grid based on scroll direction
		// TODO: remove elements from top if DOM is deep
		updateGrid( isDown ) {
			if ( isDown ) {
				this.loadMorePins();
			}
		},

		// do infinite scrolling actions
		infiniteScroll( el ) {
			var $grid = this.infiniteScrollProps.gridSelector;
			var gridH = $grid.outerHeight( true );
			var prvScrllTop = 0;
			var $el = $(el);
			var windowScrllTop = $el.scrollTop();
			var windowH = $el.outerHeight();

			if ( windowScrllTop >= gridH - windowH ) {
				this.updateGrid( true );
				this.infiniteScroll( $el );
			}
		}
	};
}