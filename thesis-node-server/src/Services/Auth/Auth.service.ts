import { Injectable } from '@nestjs/common'
import { validate } from 'class-validator'
import { save, getSpecificDoc } from 'helpers/firestore'
import { ScatterAccountReqBody } from 'Models/Auth/Auth.model'
import { IFirestoreFile } from 'Models/Storage/Storage.model'
import { DocumentSnapshot } from '@google-cloud/firestore'

@Injectable()
export class AuthService {
  root(): string {

    return 'Hello World! At auth!'
  }

  createScatterAccount(body: ScatterAccountReqBody) {
    const { first, last, email } = body
    const toFile = {
      collectionKey: 'scatter',
      documentKey: body.publicKey,
      documentBody: {
        first,
        last,
        email,
      },
    }
    return save(toFile)
  }

  async getScatterAccount(publicKey: string): Promise<DocumentSnapshot> {
    return getSpecificDoc('scatter', publicKey)
  }
}
