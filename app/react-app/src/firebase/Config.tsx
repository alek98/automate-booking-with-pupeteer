import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAorDERlI_-xfFdUaNjUiZof9YuGQPaZwI",
  authDomain: "automate-booking-with-pupeteer.firebaseapp.com",
  projectId: "automate-booking-with-pupeteer",
  storageBucket: "automate-booking-with-pupeteer.appspot.com",
  messagingSenderId: "763712958110",
  appId: "1:763712958110:web:84068eefbe4f0c283f958f"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()

if(window.location.hostname === 'localhost') {
  console.log('using localhost')
  db.useEmulator('localhost', 8080)
  auth.useEmulator("http://localhost:9099")
} else {
  console.log('not using localhost')
}
export { db, auth}