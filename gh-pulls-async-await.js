'use strict'

const request = require('request-promise-native')

function github (uri) {
  const opts = {
    method: 'GET',
    url: `https://api.github.com${uri}`,
    json: true,
    headers: {
      'User-Agent': 'request'
    }
  }

  return request(opts)
}

// https://stackoverflow.com/a/39346978
function flatten (arr) {
  return Array.isArray(arr) ? [].concat(...arr.map(flatten)) : arr
}

async function getRepos (orgName) {
  const data = await github(`/orgs/${orgName}/repos`)
  return data.map(repo => {
    return {
      orgName: orgName,
      repoName: repo.name
    }
  })
}

async function getPulls (repo) {
  const data = await github(`/repos/${repo.orgName}/${repo.repoName}/pulls`)
  return data.map(pull => {
    return {
      orgName: repo.orgName,
      repoName: repo.repoName,
      title: pull.title,
      html_url: pull.html_url
    }
  })
}

module.exports = {
  flatten: flatten,
  getRepos: getRepos,
  getPulls: getPulls
}
