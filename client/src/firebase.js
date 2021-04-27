import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';

const app = firebase.initializeApp({
  apiKey: process.env.FIREBASE_apiKey,
  authDomain: process.env.FIREBASE_authDomain,
  databaseURL: process.env.FIREBASE_databaseURL,
  projectId: process.env.FIREBASE_projectId,
  storageBucket: process.env.FIREBASE_storageBucket,
  messagingSenderId: process.env.FIREBASE_messagingSenderId,
  appId: process.env.FIREBASE_appId
})

export const auth = app.auth()
export const db = firebase.firestore()
export default app