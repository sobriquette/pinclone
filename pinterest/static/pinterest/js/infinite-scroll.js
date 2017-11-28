// infinite-scroll.js

function makeInfiniteGrid( grid, numElem, elemIDPrefix ) {
	return {
		// properties
		grid,
		numElem,
		elemIDPrefix,
		pinMaxWidth: 260;
		nextItem: 0;
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
			var end = Math.floor( $pinsGrid.outerWidth( true ) / pinMaxWidth );
			for ( var i = 0; i < end; i++ ) {
				// clonedPin = clonePin();
				var res = this.clonePin();
				var $cln = $( res );

				$pinsGrid.append( $cln ).masonry( 'appended', $cln );
			}
		},
		
		// update the grid based on scroll direction
		// TODO: remove elements from top if DOM is deep
		updateGrid( isDown ) {
			if ( isDown ) {
				this.loadMore();
			}
		}
	};
}