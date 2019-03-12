import { getSpecificDoc, merge, save } from 'helpers/firestore'
import { IFirestoreFile } from 'Models/Storage/Storage.model'

export class ProjectService {
  root(): string {
    return 'Hello World! At project!'
  }
}