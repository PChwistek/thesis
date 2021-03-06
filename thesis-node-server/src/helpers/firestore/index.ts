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

export async function getCollection(collectionKey: string): Promise<any> {
  return firestore.collection(collectionKey).get().then(snapshot => {
    const channels = []
    snapshot.forEach(doc => {
      channels.push(doc.data())
    })
    return channels
  })
}

export async function getSpecificDoc(collectionKey: string, documentKey: string): Promise<FirebaseFirestore.DocumentData> {
  const theDocRef = await firestore.collection(collectionKey).doc(documentKey).get()
  return theDocRef.data()
}

export async function merge(collectionKey: string, documentKey: string, dataToMerge: any) {
  const theDocRef = await firestore.collection(collectionKey).doc(documentKey)
  theDocRef.set({
    ...dataToMerge,
  }, { merge: true });
}

/*

var query = citiesRef.where('capital', '==', true).get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
*/