async / await vs highland.js
============================

This small project implements getting the list of pull requests from github.com
for a given set of organizations. It has 2 implementations:
* [gh-pulls-async-await.js](gh-pulls-async-await.js) - based on JavaScript
`async/await`
[construct](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
* [gh-pulls-highland-streams.js](gh-pulls-highland-streams.js) - based on
streams implemented by [highland.js](http://highlandjs.org/)

Looking at the code side-by-side it's obvious that async/await is geared more
towards imperative programming model. Stream-based implementation allows to
better express the intent but it also feels (completely subjective) slower.
