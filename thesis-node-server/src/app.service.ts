import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  root(): string {
    /*
const docRef = firestore.collection('users').doc('alovelace')

const setAda = docRef.set({
  first: 'Ada',
  last: 'Lovelace',
  born: 1815,
})
firestore.collection('users').get()
.then((snapshot) => {
  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data())
  })
})
.catch((err) => {
  console.log('Error getting documents', err)
})
    */

    return 'Hello World!'
  }
}
