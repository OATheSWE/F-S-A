import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCP984y2HskeDPyrybPj7LCSutsslByBBM",
    authDomain: "feild-service-assistant.firebaseapp.com",
    projectId: "feild-service-assistant",
    storageBucket: "feild-service-assistant.appspot.com",
    messagingSenderId: "805339234189",
    appId: "1:805339234189:web:b81f6cee2be6f8c9e8c7c4",
    measurementId: "G-DT5C69W12V"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);