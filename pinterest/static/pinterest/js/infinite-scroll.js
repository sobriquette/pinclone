// infinite-scroll.js

function makeInfiniteGrid( grid, numElem, elemIDPrefix ) {
	return {
		// properties
		grid,
		numElem,
		elemIDPrefix,
		elemMaxWidth: 260,
		nextItem: 0,
		// methods

		// pin cloning
		clonePin() {
			// pick a random pin to clone
			var randID = Math.floor( ( Math.random() * this.numElem ) + 1);
			var $item = document.getElementById( this.elemIDPrefix + randID );
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
			var end = Math.floor( this.grid.outerWidth( true ) / this.elemMaxWidth );
			for ( var i = 0; i < end; i++ ) {
				// clonedPin = clonePin();
				var res = this.clonePin();
				var $cln = $( res );

				this.grid.append( $cln ).masonry( 'appended', $cln );
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
		infiniteScroll() {
			var gridH = this.grid.outerHeight( true );
			var prvScrllTop = 0;
			var $this = $(this);
			var windowScrllTop = $this.scrollTop();
			var windowH = $this.outerHeight();

			if ( windowScrllTop >= gridH - windowH ) {
				this.updateGrid( true );
				this.infiniteScroll();
			}
		}
	};
}