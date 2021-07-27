import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD5sDArpz53W9HDNU6VUvCmqftJUzyd9eY",
  authDomain: "book-with-puppeteer.firebaseapp.com",
  projectId: "book-with-puppeteer",
  storageBucket: "book-with-puppeteer.appspot.com",
  messagingSenderId: "100105684580",
  appId: "1:100105684580:web:82c0accd4e6dc24e5dc171"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()

if(window.location.hostname === 'localhost') {
  db.useEmulator('localhost', 8080)
  auth.useEmulator("http://localhost:9099")
} 
export { db, auth}