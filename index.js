'use strict'

const orgs = ['hubotio', 'vim']

// --- async / await

const aa = require('./gh-pulls-async-await.js')

async function main (orgs) {
  const repos = aa.flatten(await Promise.all(orgs.map(aa.getRepos)))
  const pulls = aa.flatten(await Promise.all(repos.map(aa.getPulls)))
  return pulls
}

main(orgs)
  .then(console.log)
  .catch(console.log)

// --- highland streams

const hl = require('./gh-pulls-highland-streams.js')
const _ = hl.highland

// This seems to be much slower.
// Not yet clear how the errors are propagated - it seems errors may appear
// in the stream with each invocation in the chain and may need to be handled
// separately for each occurrence. There does not seem to be an easy "catch all"
// way like with Promises.
_(orgs)
  .flatMap(hl.getRepos)
  .flatMap(hl.getPulls)
  .toArray(console.log)
