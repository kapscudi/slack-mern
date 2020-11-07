import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyACPt7M3BETdRVW0CJHuNRD2B73l40MDQc',
  authDomain: 'slack-clone-6f378.firebaseapp.com',
  databaseURL: 'https://slack-clone-6f378.firebaseio.com',
  projectId: 'slack-clone-6f378',
  storageBucket: 'slack-clone-6f378.appspot.com',
  messagingSenderId: '189813798458',
  appId: '1:189813798458:web:d79eeba2e9ea92f2066703',
  measurementId: 'G-XXKQP5XMND',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
