import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDpwN2EaiGgBK9vWxe42NB70M2iUarVABc",
  authDomain: "clone-61d6f.firebaseapp.com",
  projectId: "clone-61d6f",
  storageBucket: "clone-61d6f.appspot.com",
  messagingSenderId: "1010967037739",
  appId: "1:1010967037739:web:836286fe33f73560f5676e",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db, auth };
