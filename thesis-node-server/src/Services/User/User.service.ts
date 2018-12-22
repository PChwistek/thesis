import { Injectable } from '@nestjs/common'
import { getSpecificDoc, merge, save } from 'helpers/firestore'
import { IFirestoreFile } from 'Models/Storage/Storage.model'

@Injectable()
export class UserService {
  async findOneByPublicKey(publicKey: string): Promise<FirebaseFirestore.DocumentData> {
    const theDoc = await getSpecificDoc('scatter', publicKey)
    if (!theDoc) return null
    return theDoc
  }

  async merge(publicKey: string, dataToMerge: object) {
    const theDoc = await getSpecificDoc('scatter', publicKey)
    return merge('scatter', publicKey, dataToMerge)
  }

  saveScatterAccount(toFile: IFirestoreFile) {
    return save(toFile)
  }

}