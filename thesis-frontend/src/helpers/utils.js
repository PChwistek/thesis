export function getEmbedId(link) {
  if(!link) {
    return ''
  }
  const lastSlashIndex = link.lastIndexOf('/')
  const embedId = link.slice(lastSlashIndex) 
  return embedId
}