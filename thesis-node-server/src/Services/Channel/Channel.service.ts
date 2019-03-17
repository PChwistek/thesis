import { getCollection, getSpecificDoc, merge, save } from 'helpers/firestore'
import { IFirestoreFile } from 'Models/Storage/Storage.model'

export class ChannelService {
  root(): string {
    return 'Hello World! At channel!'
  }

  async findByKey(key: string): Promise<FirebaseFirestore.DocumentData> {
    const theDoc = await getSpecificDoc('channel', key)
    if (!theDoc) return null
    return theDoc
  }

  async getChannels(terms, tags): Promise<any> {
    const theChannels = await getCollection('channel')
    console.log(theChannels)
    // search according to terms, tags
    if (!theChannels) return []
    return theChannels
  }

  async merge(body: any) {
    const { username, dataToMerge } = body
    // const theDoc = await getSpecificDoc('channel', username)
    return merge('channel', username, dataToMerge)
  }

  saveChannel(body: any) {
    const { account, username, minimumPrice, description, tags, channelName } = body
    const toFile = {
      collectionKey: 'channel',
      documentKey: account,
      documentBody: {
        account,
        username,
        minimumPrice,
        description,
        channelName,
        tags,
        subscriptions: 0,
      },
    }
    save(toFile)
    return body
  }
}