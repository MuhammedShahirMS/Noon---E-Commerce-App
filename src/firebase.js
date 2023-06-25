import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore // getDocs
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyByjopSMaPXm7EAuoHJODuGra8aqgJCPLc",
  authDomain: "oonzoo-test.firebaseapp.com",
  projectId: "oonzoo-test",
  storageBucket: "oonzoo-test.appspot.com",
  messagingSenderId: "675171946987",
  appId: "1:675171946987:web:4ce9a009fbc2a23be649ae",
};
  

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore();


  export {auth, db };

