'use strict'

const request = require('request-promise-native')
const _ = require('highland')

function github (uri) {
  const opts = {
    method: 'GET',
    url: `https://api.github.com${uri}`,
    json: true,
    headers: {
      'User-Agent': 'request'
    }
  }

  // https://stackoverflow.com/a/36181348/5450576
  return _(request(opts))
    // .errors((err, push) => { console.log(err.message) })
    .collect()
    .map(Buffer.concat)
    .flatMap(x => JSON.parse(x.toString('UTF-8')))
}

function getRepos (orgName) {
  return github(`/orgs/${orgName}/repos`).map(repo => {
    return {
      orgName: orgName,
      repoName: repo.name
    }
  })
}

function getPulls (repo) {
  return github(`/repos/${repo.orgName}/${repo.repoName}/pulls`).map(pull => {
    return {
      orgName: repo.orgName,
      repoName: repo.repoName,
      title: pull.title,
      html_url: pull.html_url
    }
  })
}

module.exports = {
  highland: _,
  getRepos: getRepos,
  getPulls: getPulls
}
