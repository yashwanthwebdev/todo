
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {

    apiKey: "AIzaSyASIeOPXeVbO5i2VM_tyTt9RchPmuo3CgE",
  
    authDomain: "todo-3476e.firebaseapp.com",
  
    projectId: "todo-3476e",
  
    storageBucket: "todo-3476e.appspot.com",
  
    messagingSenderId: "218977326715",
  
    appId: "1:218977326715:web:f3ff23fd161247ec8834de"
  
  };

  
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)