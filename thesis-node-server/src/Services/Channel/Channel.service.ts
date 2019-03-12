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

  async merge(key: string, dataToMerge: object) {
    const theDoc = await getSpecificDoc('channel', key)
    return merge('scatter', key, dataToMerge)
  }

  saveChannel(toFile: IFirestoreFile) {
    return save(toFile)
  }
}