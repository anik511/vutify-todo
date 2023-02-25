import axios from 'axios'
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBEB1Eyfgbs4SaFx6yjVUIELUP3DVshwzY",
//   authDomain: "stupid-todo.firebaseapp.com",
//   projectId: "stupid-todo",
//   storageBucket: "stupid-todo.appspot.com",
//   messagingSenderId: "290135138545",
//   appId: "1:290135138545:web:3c88f0cf417e7e87d64950",
//   measurementId: "G-RN260NZ119"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const db = firebase.database()

const http = axios.create({
    baseURL: `https://stupid-todo-c6680-default-rtdb.asia-southeast1.firebasedatabase.app/`,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json'
      }
    // timeout: 10000
})

export default {
  addTask(data) {
      // console.log("app===> ", app);
      return http.post( 'tasks.json', data, {
          // params: {
          //     auth: `${firebaseConfig.apiKey}`
          // }
      })
    },
    getTasks(){
      return http.get('tasks.json')
    }
}