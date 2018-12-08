import { Injectable } from '@nestjs/common'
import { save, getSpecificDoc } from 'helpers/firestore'
import { ScatterAccountReqBody, GetScatterAccountReqBody } from 'Models/Auth/Auth.model'

@Injectable()
export class AuthService {
  root(): string {

    return 'Hello World! At auth!'
  }

  createScatterAccount(body: ScatterAccountReqBody) {
    const { hash, username, first, last, email } = body
    const toFile = {
      collectionKey: 'scatter',
      documentKey: body.publicKey,
      documentBody: {
        username,
        hash,
        first,
        last,
        email,
      },
    }
    return save(toFile)
  }

  async getScatterAccount(body: GetScatterAccountReqBody): Promise<FirebaseFirestore.DocumentData | boolean> {
    const theDoc = await getSpecificDoc('scatter', body.publicKey)
    if (!theDoc) return false
    if (body.hash === theDoc.hash) {
      return theDoc
    }
    return false
  }
}
