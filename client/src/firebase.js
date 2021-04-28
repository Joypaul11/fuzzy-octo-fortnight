import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig';
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = firebase.firestore();
export default app;