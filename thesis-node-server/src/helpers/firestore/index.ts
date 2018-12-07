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


export const save = (file: IFirestoreFile) => {
  const docRef = firestore.collection(file.collectionKey).doc(file.documentKey)
  docRef.set({
    ...file.documentBody,
  })
}

export const get = (collectionKey: string, documentKey: string) => {
  return firestore.collection(collectionKey).doc(documentKey)
}

/*
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