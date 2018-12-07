import { Injectable } from '@nestjs/common'
import { validate } from 'class-validator'
import { save } from 'helpers/firestore'
import { ScatterAccountReqBody } from 'Models/Auth/Auth.model'

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
}
