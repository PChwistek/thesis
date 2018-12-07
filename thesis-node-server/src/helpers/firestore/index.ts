import admin from 'firebase-admin'

/* tslint:disable */ 
//this needs to be a module or TS freaks out
var serviceAccount = require('./credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://thesis-fe9e9.firebaseio.com'
})
const firestore =  admin.firestore()
firestore.settings({timestampsInSnapshots: true})
export default firestore

