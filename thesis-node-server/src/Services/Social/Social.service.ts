import { getSpecificDoc, merge, save } from 'helpers/firestore'
import { IFirestoreFile } from 'Models/Storage/Storage.model'

export class SocialService {
  root(): string {
    return 'Hello World! At social!'
  }

  async feed(body): Promise<any> {
    const { username } = body
    console.log('SOCIAL', username)
    const theDoc = await this.findByKey(username)
    const feed = []
    // get feed from subscriptions too
    feed.push(theDoc.posts)
    // sort appropriately
    return feed
  }

  async findByKey(key: string): Promise<FirebaseFirestore.DocumentData> {
    const theDoc = await getSpecificDoc('social', key)
    if (!theDoc) return null
    return theDoc
  }

  async merge(key: string, dataToMerge: object) {
    const theDoc = await getSpecificDoc('social', key)
    // merge into list of posts
    return merge('scatter', key, dataToMerge)
  }

  async savePost(body: any) {
    // add to list of posts
    const { username, newPost } = body
    const theDoc = await getSpecificDoc('social', username)
    const posts = !theDoc.posts ? [] : theDoc.posts

    posts.push( newPost )

    const toFile = {
      collectionKey: 'social',
      documentKey: username,
      documentBody: {
        posts,
      },
    }
    return save(toFile)
  }

  async getFeed(key: string) {
    // get feed
  }
}