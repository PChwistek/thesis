import { Injectable } from '@nestjs/common'
import { getSpecificDoc, merge, save } from 'helpers/firestore'
import { IFirestoreFile } from 'Models/Storage/Storage.model'

@Injectable()
export class PollService {
  root(): string {
    return 'Hello World! At poll!'
  }

  async savePoll(body) {
    const { account, thePoll } = body
    const theDoc = await getSpecificDoc('polls', account)
    const polls = !theDoc ? [] : theDoc.polls

    polls.push( thePoll )

    const toFile = {
      collectionKey: 'poll',
      documentKey: account,
      documentBody: {
        polls,
      },
    }

    return save(toFile)
  }
}