
import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/firebase-database';
const firebaseConfig = {
    apiKey: "AIzaSyCcZmUQXDw1axhbnUG_XYx8vg3MKsaOVv0",
    authDomain: "vue-app-4f249.firebaseapp.com",
    databaseURL: "https://vue-app-4f249.firebaseio.com",
    projectId: "vue-app-4f249",
    storageBucket: "vue-app-4f249.appspot.com",
    messagingSenderId: "20866189320",
    appId: "1:20866189320:web:36513a942281ede2fda9bd"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.database();
 export const chatRef = db.ref("chats");

//Export
export default firebase;
