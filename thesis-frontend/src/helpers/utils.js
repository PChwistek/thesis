import axios from 'axios'

export function getEmbedId(link) {
  if(!link) {
    return ''
  }
  const lastSlashIndex = link.lastIndexOf('/')
  const embedId = link.slice(lastSlashIndex) 
  return embedId
}

export function getPoll(account, post, type) {
  return axios({
    method: 'POST',
    url: 'http://localhost:3009/api/poll/get',
    data: {
      account,
      projectKey: post.projectKey,
      voteType: type,
    }
  }).then(res => {
    return res.data
  })
}
