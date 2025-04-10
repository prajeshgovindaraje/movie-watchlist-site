// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjvYDauzfy4Siw3ZXBbkKyteWEQMeZjkY",
  authDomain: "reel-list.firebaseapp.com",
  projectId: "reel-list",
  storageBucket: "reel-list.firebasestorage.app",
  messagingSenderId: "739456916520",
  appId: "1:739456916520:web:1a9ab5ef7b3c03292f691d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth,db}




//updating a field in a document

//                const userRef = doc(db, "users", userDetails.uid);

//                 await updateDoc(userRef, {
//                     watchList: arrayUnion(movieDetail)
//                 });
//                 console.log("moivie added")


// adding user details to firestore
//  const userDetailsInDb = {
//        email:userDetails.user.email,
//        uid:userDetails.user.uid
//    }
//    await setDoc(doc(db,"users",userDetails.user.uid),{
//        userDetails:userDetailsInDb,
//        watchList:[]
//  })