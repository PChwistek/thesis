import admin from 'firebase-admin'
import { IFirestoreFile } from 'Models/Storage/Storage.model'
/* tslint:disable */ 
//this needs to be a module or TS freaks out
var serviceAccount = require('./credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://thesis-fe9e9.firebaseio.com'
})
const firestore =  admin.firestore()
firestore.settings({timestampsInSnapshots: true})


export function save(file: IFirestoreFile) {
  const docRef = firestore.collection(file.collectionKey).doc(file.documentKey)
  docRef.set({
    ...file.documentBody,
  })
}

export async function getSpecificDoc(collectionKey: string, documentKey: string): Promise<FirebaseFirestore.DocumentData> {
  const theDoc = await firestore.collection(collectionKey).doc(documentKey).get()
  return theDoc.data()
}