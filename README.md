# Pinterest Clone

Building a mini Pinterest app using Django

## Problem Statement

Design and implement a web page that displays JSON data and allows infinite scrolling, reusing the data as needed. Page should be able to accommodate other widgets.

## Approach

* Attempted to parse the JSON file I had on hand with JavaScript...except that doesn't work because local files cannot be accessed that way. (Security issues -- provides the potential for malicious authors to deliver scripts to run on a client computer via the web. Scripts are sandboxed so they can only perform web-related actions).
* Decided to set up a lightweight web server that can serve the file to the client: chose Django for this purpose since everything works out of the box.

Django also seemed like a good way to understanding the technology stack used at Pinterest!

```
Example
```

## Setup
Instructions to install Django are [here](https://docs.djangoproject.com/en/1.11/topics/install/#installing-official-release). All my python packages are installed through pip.

I also created a virtual envrionment with virtualenv and virtualenvwrapper to install the packages I'm using for the project. The best tutorial I've found for setting this up is [The Hitchhiker's Guide to Python](http://docs.python-guide.org/en/latest/dev/virtualenvs/).

On the front-end, I decided to go with React (which I have installed but have yet to use) and setup Webpack and Babel while I was at it. Make sure you have Bower and npm installed. This [tutorial](http://gregblogs.com/how-django-reactjs-and-browserify/) is what I followed to incorporate the front-end tools into Django.


## Architectural Considerations

Filling in later.

```
Example
```

And repeat

```
Example
```



### Database, or nah?

NoSql vs. SQL

### Unit testing, or nah?

Not sure if I'll get to this point

```
Give an example
```

### Front-end framework

React? Because that's all everyone talks about these days.

Grid layout is handled by [Masonry](https://masonry.desandro.com/).

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Sources

* [Django](https://docs.djangoproject.com/en/1.11/intro/) - The web framework used

## Authors

* **Melody Lin** - *Everything* - [Pinterest clone](https://github.com/sobriquette/pinclone)
