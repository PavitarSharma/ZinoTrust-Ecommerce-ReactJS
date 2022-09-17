
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

export const firebaseConfig = {
    apiKey: "AIzaSyAVM3EQ5yaYAG2RugRA2tFrhPnxTxtcqSo",
    authDomain: "eshop-7f93a.firebaseapp.com",
    projectId: "eshop-7f93a",
    storageBucket: "eshop-7f93a.appspot.com",
    messagingSenderId: "458254034249",
    appId: "1:458254034249:web:c8e85a522bb8fa1d8e6698",
    measurementId: "G-1CPSW9S2R6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
