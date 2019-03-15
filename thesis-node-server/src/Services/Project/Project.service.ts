import { Injectable } from '@nestjs/common'
import { getSpecificDoc, merge, save } from 'helpers/firestore'
import { IFirestoreFile } from 'Models/Storage/Storage.model'

@Injectable()
export class ProjectService {
  root(): string {
    return 'Hello World! At project!'
  }

  getActive(): any {
    return []
  }

  getAll(): any {
    return []
  }

  async declareProject(post): Promise<any> {
    const { user } = post
    const theDoc = await getSpecificDoc('projects', user)
    const projects = !theDoc ? [] : theDoc.projects

    projects.push( post )

    const toFile = {
      collectionKey: 'projects',
      documentKey: user,
      documentBody: {
        projects,
      },
    }

    return save(toFile)
  }

  modifyProject(body): any {
    return true
  }

  fulfillProject(body): any {
    return true
  }

}