import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCmV9z6718YROGRYsfl4TgDLhZ_i3PZmmU",
  authDomain: "slack-clone-df187.firebaseapp.com",
  databaseURL: "https://slack-clone-df187.firebaseio.com",
  projectId: "slack-clone-df187",
  storageBucket: "slack-clone-df187.appspot.com",
  messagingSenderId: "698144820332",
  appId: "1:698144820332:web:06578e05a55d4311c09c49",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
