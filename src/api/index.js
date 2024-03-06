import * as config from './config.js'

import http from 'http'

const linkedinParams = { code: '' }

const server = http.createServer((req, res) => {
  const { searchParams } = new URL(`${config.linkedinAPI.redirect_uri}${req.url}`)
  if (searchParams.has('code')) console.log('code', linkedinParams.code = searchParams.get('code'))
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end(Date.now().toString())
})

server.listen(80)

// const requestJSON = (method, url, headers, body = null) => fetch(url, { method, headers, body: stringifyBody(body) }).then(res => res.json())

// const requestText = (method, url, headers, body = null) => fetch(url, { method, headers, body }).then(res => res.text())

// const stringifyBody = (body) => body ? JSON.stringify(body) : null

const padLeft = (text, length = 1, pad = ' ') => {
  while (text.toString().length < length) text = pad.toString() + text.toString()
  return text.toString()
}

// const getDate = (date = new Date()) => [date.getFullYear(), padLeft(date.getMonth() + 1, 2, '0'), padLeft(date.getDay(), 2, '0')].join('-')

// const newsAPI = (apiKey, q = '', from = getDate(), sortBy = 'publishedAt') => requestJSON('GET', `https://newsapi.org/v2/everything?q=${q}&from=${from}&sortBy=${sortBy}&apiKey=${apiKey}`).then(({ articles }) => Array.from(articles).map(({ title, url, urlToImage }) => ({ title, url, urlToImage })))

// const linkedinAuthorization = { Authorization: `Bearer ${apiKey}` }

// const linkedinPosts = () => requestJSON('POST', 'https://api.linkedin.com/v2/ugcPosts', {}, {})

const linkedinAccessToken = (grant_type, code, client_id, client_secret, redirect_uri) => requestText('POST', 'https://www.linkedin.com/oauth/v2/accessToken', linkedinAuthorization, [`grant_type=${grant_type}`, `code=${code}`, `client_id=${client_id}`, `client_secret=${client_secret}`, `redirect_uri=${redirect_uri}`,].join('\r\n'))

// const linkedinRegisterUpload = (apiKey, owner) => ('POST', 'https://api.linkedin.com/v2/assets?action=registerUpload', linkedinAuthorization, { 'registerUploadRequest': { 'recipes': ['urn:li:digitalmediaRecipe:feedshare-image'], 'owner': `urn:li:person:${owner}`, 'serviceRelationships': [{ 'relationshipType': 'OWNER', 'identifier': 'urn:li:userGeneratedContent' }] } })

const createAuthURL = (response_type, client_id, redirect_uri, scope, state = null) => `https://www.linkedin.com/oauth/v2/authorization?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}`

console.log('url', createAuthURL(config.linkedinAPI.response_type, config.linkedinAPI.client_id, config.linkedinAPI.redirect_uri, config.linkedinAPI.scope))
