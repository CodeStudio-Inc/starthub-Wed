import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyA9UUfAacEwZhPmE_33GnDaDwfyjhf8bJ0",
    authDomain: "starthub-ca6f3.firebaseapp.com",
    databaseURL: "https://starthub-ca6f3-default-rtdb.firebaseio.com",
    projectId: "starthub-ca6f3",
    storageBucket: "starthub-ca6f3.appspot.com",
    messagingSenderId: "230232796391",
    appId: "1:230232796391:web:0aa453b97fa218f06f4642",
    measurementId: "G-JRY41FK0XW"
});

var auth = firebaseConfig.auth()
var storage = firebaseConfig.storage()
export { auth, storage };