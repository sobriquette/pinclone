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

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Sources

* [Django](https://docs.djangoproject.com/en/1.11/intro/) - The web framework used

## Authors

* **Melody Lin** - *Everything* - [Pinterest clone](https://github.com/sobriquette/pinclone)
