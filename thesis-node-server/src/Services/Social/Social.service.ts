import { Injectable } from '@nestjs/common'
import { getSpecificDoc, merge, save } from 'helpers/firestore'
import { ProjectService } from 'Services/Project/Project.service'

@Injectable()
export class SocialService {
  constructor(
    private readonly projectService: ProjectService,
    ) {}

  root(): string {
    return 'Hello World! At social!'
  }

  async feed(body): Promise<any> {
    const { username } = body
    console.log('SOCIAL', username)
    const theDoc = await this.findByKey(username)
    const feed = []
    // get feed from subscriptions too
    if (theDoc) {
      feed.push(theDoc.posts)
    }
    // sort appropriately
    return feed
  }

  async channelFeed(body): Promise<any> {
    const { username } = body
    console.log('SOCIAL', username)
    const theDoc = await this.findByKey(username)
    const feed = []
    if (theDoc) {
      feed.push(theDoc.posts)
    }
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
    const { account, newPost } = body
    const theDoc = await getSpecificDoc('social', account)
    const posts = !theDoc.posts ? [] : theDoc.posts

    posts.push( newPost )

    const toFile = {
      collectionKey: 'social',
      documentKey: account,
      documentBody: {
        posts,
      },
    }
    console.log('New Post', newPost)
    switch (newPost.type) {
      case 'declaration':
        this.projectService.declareProject(newPost)
        break
      case 'delivery':
        this.projectService.fulfillProject(newPost)
        break
      case 'extension':
        this.projectService.modifyProject(newPost)
        break
      default:
        break
    }
    return save(toFile)
  }
}