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

  async getAll(body): Promise<any> {
    const { account } = body
    const theDoc = await this.findByKey(account)
    const projects = []
    if (theDoc) {
      projects.push(theDoc.projects)
    }
    return projects
  }

  async findByKey(key: string): Promise<FirebaseFirestore.DocumentData> {
    const theDoc = await getSpecificDoc('projects', key)
    if (!theDoc) return null
    return theDoc
  }

  async declareProject(account, post): Promise<any> {
    const theDoc = await getSpecificDoc('projects', account)
    post.active = true
    const projects = !theDoc ? [] : theDoc.projects

    projects.push( post )

    const toFile = {
      collectionKey: 'projects',
      documentKey: account,
      documentBody: {
        projects,
      },
    }

    return save(toFile)
  }

  modifyProject(body): any {
    return true
  }

  async fulfillProject(account, post): Promise<any> {
    const theDoc = await this.findByKey(account)
    const foundIndex = theDoc.projects.findIndex(x => x.projectTitle === post.title)
    const theProject = theDoc.projects[foundIndex]
    theProject.active = false
    theDoc.projects[foundIndex] = theProject
    return merge('projects', account, theDoc)
  }

}