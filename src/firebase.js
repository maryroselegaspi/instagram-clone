import firebase from 'firebase';

const firebaseConfig ={
    apiKey: "AIzaSyBBHnyOQwZpR6FCUGzJkqRbAWy9XHZ7jHU",
    authDomain: "instagram-clone-da3b0.firebaseapp.com",
    databaseURL: "https://instagram-clone-da3b0.firebaseio.com",
    projectId: "instagram-clone-da3b0",
    storageBucket: "instagram-clone-da3b0.appspot.com",
    messagingSenderId: "104438858319",
    appId: "1:104438858319:web:ac6c756c967f09bf24a03a",
    measurementId: "G-KW8ESDRHP1"
}

//Authentication
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth =firebase.auth();
const storage = firebase.storage();

export {db, auth, storage, firebaseApp};
// export default db;

// TODO: npm install firebase