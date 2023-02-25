



import firebase from 'firebase/app'
import 'firebase/database'

// Replace the config with your project's Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBEB1Eyfgbs4SaFx6yjVUIELUP3DVshwzY",
    authDomain: "stupid-todo.firebaseapp.com",
    projectId: "stupid-todo",
    storageBucket: "stupid-todo.appspot.com",
    messagingSenderId: "290135138545",
    appId: "1:290135138545:web:3c88f0cf417e7e87d64950",
    measurementId: "G-RN260NZ119"
};

firebase.initializeApp(firebaseConfig)

export const db = firebase.database()