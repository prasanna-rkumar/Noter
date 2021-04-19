import firebase from 'firebase/app'

import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAoSRuhsvi5Hs3tYIvXYmB_xRk6rEDuofY",
  authDomain: "noter-f9211.firebaseapp.com",
  projectId: "noter-f9211",
  storageBucket: "noter-f9211.appspot.com",
  messagingSenderId: "229301461158",
  appId: "1:229301461158:web:139f954c543b346fc29467",
  measurementId: "G-LSRCKQE6CC"
};

firebase.initializeApp(firebaseConfig);

const noterFirestore = firebase.firestore();
const noterStorage = firebase.storage();
const noterAuth = firebase.auth();

const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

const firebaseTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export { noterFirestore, noterAuth, noterStorage, firebaseTimestamp, GoogleAuthProvider };