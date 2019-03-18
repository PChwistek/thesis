import { Injectable } from '@nestjs/common'
import { getSpecificDoc, merge, save } from 'helpers/firestore'
import { IFirestoreFile } from 'Models/Storage/Storage.model'
import { ChannelService } from 'Services/Channel/Channel.service'
@Injectable()
export class UserService {
  constructor(
    private readonly channelServce: ChannelService,
  ) {}

  root() {
    return 'At user!'
  }

  async subscribe(body): Promise<any> {
    const { subscriber, creator } = body
    console.log(body)
    const userData = await this.findByIndex(subscriber)
    if (!userData.subscribedTo) {
      userData.subscribedTo = []
    }
    userData.subscribedTo.push(creator)
    this.merge(subscriber, userData)
    this.channelServce.incrementSubs(creator)
    return userData.subscribedTo
  }

  async unsubscribe(body): Promise<any> {
    const { subscriber, creator } = body
    const userData = await this.findByIndex(subscriber)
    if (!userData.subscribedTo) {
      userData.subscribedTo = []
    }
    userData.subscribedTo = userData.subscribedTo.filter(value => value !== creator)
    this.merge(subscriber, userData)
    return userData.subscribedTo
  }

  async findByIndex(account: string): Promise<FirebaseFirestore.DocumentData> {
    const theDoc = await getSpecificDoc('scatter', account)
    if (!theDoc) return null
    return theDoc
  }

  async merge(account: string, dataToMerge: object) {
    const theDoc = await getSpecificDoc('scatter', account)
    return merge('scatter', account, dataToMerge)
  }

  saveScatterAccount(toFile: IFirestoreFile) {
    return save(toFile)
  }

}