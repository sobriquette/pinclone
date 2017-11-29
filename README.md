# Pinterest Clone

Building a Pinterest-like grid using Django

## Problem Statement

1. Design and implement a web page that displays JSON data and allows infinite scrolling, reusing the data as needed.
   + Build the infinite scrolling in a modular way so that this could be easily reused in other pages.
2. Page should be able to accommodate other widgets that can be dragged and dropped onto the page.

## Result
If you are looking to run this project locally, the entirety of it is captured on [my GitHub repository](https://github.com/sobriquette/pinclone). The page that the pins with infinite scrolling + drag-and-drop functionality is hosted at: http://127.0.0.1:8000/pinterest/.

### Building a back-end
I decided to write a lightweight Django app to host and display the web page and leverage the SQLite database to hold the JSON data provided. This enables us to create, read, update, and delete pins from the page more easily than hardcoding it in HTML. It also allows us to use Python to filter out JSON data we do not necessarily need, and clearly define relationships between individual JSON objects.

### Infinite Scroll
#### How it works
For a fluid and beautiful grid layout, I used the [Masonry](https://masonry.desandro.com/) JavaScript library.

To implement the infinite scrolling, I decided to clone the original pins given by the JSON data -- i.e. the DOM nodes. When the user reaches the bottom of the browser window, the next row of Pins will be generated and appended to the Masonry grid. I thought it would be more interesting to randomize selection of pins for cloning, so that (from a user perspective) it doesn't get boring going through the same pins, in the same order.

#### Code package
In order to provide a plug-and-play experience, the code for infinite scrolling is abstracted into a JavaScript object called [makeInfiniteGrid](https://github.com/sobriquette/pinclone/blob/master/pinterest/static/pinterest/js/infinite-scroll.js). This script includes the necessary methods to facilitate infinite scrolling within a Masonry grid.

This means that to use infinite scroll on any other page, a developer only has to provide a couple jQuery selectors, call an initialization method, and the infinite scroll method.

```
// some-page.js -- any page script that wants infinite scroll
// We just need to provide the following:

var infiniteScrollProps = {
	// required
	gridSelector : $('#my-grid'),		// the grid all elements will fill	
	itemSelector : '.grid-item',		// the elements within the grid
	numElem: $('.grid-item').length, 	// used to calculate number of elements to generate per roll on scroll
	elemIDPrefix: 'grid-id-',			// used to generate new ids for cloned elements so they stay unique

	// optional
	columnWidth : '.grid-sizer',		// a selector element can be used for responsive resizing, but an integer value is fine otherwise
	gutter : 20,						// gutter between columns
	fitWidth: true						// relevant only if responsive resizing for columnWidth
};

// instantiate the infinite-scroll grid
var infiniteScrollGrid = makeInfiniteGrid( infiniteScrollProps );

// ...

infiniteScrollGrid.initMasonry();

// Our listener for scroll events
// We only need to call infiniteScroll() on the grid we created
// and it'll handle the rest

$(window).on('scroll', function() {
	var $this = $(this);
	infiniteScrollGrid.infiniteScroll( $this );
});
```

#### Caveats
One thing to watch out for with this approach is that if the page gets long enough and the DOM deep enough, we could run out of buffer and this would impact page performance. 

A way to resolve this is by removing DOM nodes from the top of the page if the user is far enough down the runway that they would not notice missing pins. And when they scroll back up, we would have to regenerate the set of pins that were removed. 

Another consideration is reducing the amount of reflow that occurs when we remove and add new pins to the DOM.

A helpful resource for the general gist of how this would work is described [here](https://developers.google.com/web/updates/2016/07/infinite-scroller). Implementing these enhancements would introduce additional complexity and time, but are definitely issues I would work to resolve in future iterations of this project!  

### Drag and Drop
** Assumption: **
*I assumed that the infinite-scroll element (the grid of Pinterest Pins) is expected to be re-arrangeable as well, and also required drag-and-drop functionality.*

#### How it works
For a fluid grid layout that plays well (generally) with drag-and-drop functionality, I leveraged the [Packery](https://packery.metafizzy.co/) and [Draggabilly](https://draggabilly.desandro.com/) JavaScript libraries.

Since I wasn't sure how other widgets would be provided to this page, I decided to demonstrate the drag-and-drop functionality of the grid with an *"Add more widgets"* button at the top of the page. When this button is clicked, it will generate a new drag-and-drop-ready widget that can be arranged anywhere within the Packery grid. I am assuming that if a widget ends up outside of the grid, it was unintentional. So the settings I chose for the grid will keep all widgets within the container. If a widget is moved out of bounds, it will snap back to its original position, or the nearest draggable position.

__Note:__** The infinite-scrolling Masonry grid is floated to the left on page load, but is draggable by default. So even if no other widgets are added to the page, the user still has flexibility to drag and drop the grid on different parts of the page.

#### Code package
In order to provide a plug-and-play experience, the code for a drag-and-drop container is abstracted into a JavaScript object called [makeDraggableContainer](https://github.com/sobriquette/pinclone/blob/master/pinterest/static/pinterest/js/drag-and-drop.js). This script includes the necessary methods to facilitate drag-and-drop functionality within the Packery grid.

This means that to make all elements within the container draggable and droppable, a developer only has to provide a couple jQuery selectors and call an initialization method.

```
// some-page.js -- any page script that wants drag-and-drop
// We just need to provide the following:

var $drgContainer = $('#drag-container');	// this will be the container with drag-and-drop enabled
var numWidgets = $('.widget').length;		// used to generate new ids for each additional widget

var drgContainerProps = {
	// required
	itemSelector : '.widget',			// selector for all widgets that should be drag-and-drop
	columnWidth : '.grid-sizer',		// a selector element can be used for responsive sizing, but an integer value is fine otherwise
	gutter : '.gutter-sizer'			// a selector element can be used for responsive sizing, but an integer value is fine otherwis
};
```

#### Caveats
**#1**
One of the tricky things about this layout is that there is an infinite-scrolling widget on the page. Because it is inherently larger than all other widgets in the grid, what can happen is the infinite-scroll grid will bump smaller widgets that do not fit into its row, onto the next row. This can be problematic because when the user then scrolls to retrieve the bumped widget on the following row, they get caught in the infinite scroll mechanism.

The solution to this isn't clear to met yet, but I would probably look into moving the infinite-scroll elements outside of the draggable container.

**#2**
The expected behavior for a responsive Packery grid is that the gutters will not necessarily be even. There are ways to have even gutters; however, the methods to do so conflict with the way Draggabilly expect elements to be sized.

For a fluid grid with even gutters, we would need to remove the Packery ```columnWidth``` property, which sets all element widths based on a specific element. This creates conflict with Draggabilly](https://packery.metafizzy.co/draggable.html) because dragged items can only be dropped in place of other items if no ```columnWidth``` is set. What this means is that once an item is moved out of its place -- and no other item fills in that space -- we cannot reuse that space within the grid.

I prioritized the ability to drag and drop anywhere within the container over keeping the gutters even, and decided to keep the ```Packery.columnWidth``` property set.

## Process
### Initial Approach
I attempted to parse the JSON file I had on hand with JavaScript...except that doesn't work because local files cannot be accessed that way. (Security issues -- provides the potential for malicious authors to deliver scripts to run on a client computer via the web. Scripts are sandboxed so they can only perform web-related actions).

So I (very) briefly considered whether it would be worth the time to manually write the HTML for each of the pins in the JSON. It was not.

### Final Approach
I decided keep it as programmatic as possible, by parsing the JSON data and migrating it into a database -- from which I would query for all the Pins data and display it on a web page. Python is my favorite language, so I chose Django as my web framework (also figured it would be a great way to understand the technology stack used at Pinterest).

## Technical Details
### Manipulating JSON data
After looking at the JSON data provided, I made the decision to break out each JSON object into the following parts: Pin, Pinner, Board, and Image. Categorizing the data this way helps us not only manage the relationships between each piece, but also streamlines how data is pulled onto the page.

I also decided to pick the attributes most commonly used in a pin (as it is displayed on a Pinterest page), for display on the web page being built here: title, description, source, likes.

To parse the JSON data, I wrote a Python script called *parsePins.py*. The script runs through the JSON and parses each JSON object and inserts it into an appropriate Python dictionary based on classes I had written to describe the data (Pinner, Pin, Board, Image).


```
# from parsePins.py

class Pin:
	def __init__(self, **kwargs):
		self.allowed_keys = {
			'pin_id',
			'board',
			'description',
			'like_count',
			'link',
			'title'
		}
		self.__dict__.update((k, v) for k, v in kwargs.items() \
									if k in self.allowed_keys)
```

Once all the JSON data were funneled into the appropriate buckets, I wrote a helper method *write_fixtures* to create fixtures for each of the 4 objects. These fixture files were then used to migrate all the data into tables I had set up in the Django database. The schema generally follows the same pattern as the Python classes I wrote.

```
// JSON fixture for pins
[ 
	{
		"model": "pinterest.pin",
		"pk": 404690716496794205,
		"fields": {
			"pin_id": "404690716496794205",
			"board": "404690785205110235",
			"description": "* * KITTEN: \" Me name be Three-Quarter cuz dat be abouts me tail. Me don't minds it cuz me be loved by me humans.",
			"like_count": 9,
			"link": "https://flic.kr/p/r8J5Ze",
			"title": "Kitty Dora"
		}
	},
	//...
]
```

Now that the original JSON data has been massaged into something useable for the web page, we're ready to write some JavaScript/HTML/CSS!

### Database
The out-of-the-box SQLite that comes with Django was used for my database. I modeled my model schemas and relationships after how I imagine Pinterest to have its models set up. The relationships are as follows:

* A Pinner has many boards (one-to-many)
* Boards have many pins (many-to-many: so that many boards can have the same pin, and the same pin can belong to many boards)
* Pins have many images (one-to-many: this was to account for the different image sizes provided in the JSON data)

Instead of using the auto-generated primary keys by SQLite, I decided to keep it "real" to the data, and use the ids provided in the original JSON.

### Setup
Instructions to install Django are [here](https://docs.djangoproject.com/en/1.11/topics/install/#installing-official-release). All my python packages are installed through pip.

I also created a virtual envrionment with virtualenv and virtualenvwrapper to install the packages I'm using for the project. The best tutorial I've found for setting this up is [The Hitchhiker's Guide to Python](http://docs.python-guide.org/en/latest/dev/virtualenvs/).

### Future enhancements
1. Unit testing (or at least include linting for JS)
2. Gulp for automating JS/CSS minification, transpiling, and builds
3. Webpack and Babel for bundling
4. Upgrade to React from vanilla JS/HTML/CSS

## Sources

* [Django](https://docs.djangoproject.com/en/1.11/intro/)
* [Masonry](https://masonry.desandro.com/)
* [Packery](https://packery.metafizzy.co/)
* [Draggabilly](https://draggabilly.desandro.com/)
* Lots and lots of Stack Overflow

## Authors
* **Melody Lin**
[Personal Website](https://sobriquette.github.io/)
[GitHub](https://github.com/sobriquette)
[LinkedIn](https://www.linkedin.com/in/linmelody/)
