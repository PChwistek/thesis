import { getSpecificDoc, merge, save } from 'helpers/firestore'
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

  async merge(body: any) {
    const { username, dataToMerge } = body
    // const theDoc = await getSpecificDoc('channel', username)
    return merge('channel', username, dataToMerge)
  }

  saveChannel(body: any) {
    const { username, minimumPrice } = body
    const toFile = {
      collectionKey: 'channel',
      documentKey: username,
      documentBody: {
        username,
        minimumPrice,
      },
    }
    return save(toFile)
  }
}