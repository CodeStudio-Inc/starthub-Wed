import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyDfTUPoQcN97KsBSZaFVZR5_2a_Tu06IZQ",
    authDomain: "qraftstore-be493.firebaseapp.com",
    databaseURL: "https://qraftstore-be493.firebaseio.com",
    projectId: "qraftstore-be493",
    storageBucket: "qraftstore-be493.appspot.com",
    messagingSenderId: "548146895636",
    appId: "1:548146895636:web:927bdd2349fb0d91778001",
    measurementId: "G-WZJXJF2YGF"
});

var auth = firebaseConfig.auth()
var storage = firebaseConfig.storage()
export { auth, storage };