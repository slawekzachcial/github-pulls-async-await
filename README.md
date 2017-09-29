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

The *client* use of each approach is shown in [index.js](index.js):

* async / await

```javascript
const aa = require('./gh-pulls-async-await.js')

async function main (orgs) {
  const repos = aa.flatten(await Promise.all(orgs.map(aa.getRepos)))
  const pulls = aa.flatten(await Promise.all(repos.map(aa.getPulls)))
  return pulls
}

main(orgs)
  .then(console.log)
  .catch(console.log)
```

* streams

```javascript
const hl = require('./gh-pulls-highland-streams.js')
const _ = hl.highland

_(orgs)
  .flatMap(hl.getRepos)
  .flatMap(hl.getPulls)
  .toArray(console.log)
```
