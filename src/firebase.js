import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCK0SEyyH0B51hBpz_x6L-xvInV7jtgIzs",
  authDomain: "discordclone-d31e3.firebaseapp.com",
  projectId: "discordclone-d31e3",
  storageBucket: "discordclone-d31e3.appspot.com",
  messagingSenderId: "416526014590",
  appId: "1:416526014590:web:543c49ea6cbdd801cba02f",
  measurementId: "G-N08ZEHQCJP"
};
// step 1
// set he app up, connect everything we need
const firebaseApp = firebase.initializeApp(firebaseConfig);
//  step 2 connect to firestore db
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;