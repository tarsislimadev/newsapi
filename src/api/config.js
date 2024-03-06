// 

export const newsAPI = {
  apiKey: '',
}

export const linkedinAPI = {
  client_id: '',
  client_secret: '',
  response_type: 'code',
  redirect_uri: 'http://localhost:8080/',
  scope: encodeURI(['openid', 'profile', 'w_member_social', 'email'].join(' ')),
}
