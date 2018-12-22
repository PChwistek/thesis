import { Injectable } from '@nestjs/common'
import { getSpecificDoc, save } from 'helpers/firestore'
import { IFirestoreFile } from 'Models/Storage/Storage.model'

@Injectable()
export class UserService {
  async findOneByPublicKey(publicKey: string): Promise<FirebaseFirestore.DocumentData> {
    const theDoc = await getSpecificDoc('scatter', publicKey)
    if (!theDoc) return null
    return theDoc
  }

  createNewScatterAccount(toFile: IFirestoreFile) {
    return save(toFile)
  }

}