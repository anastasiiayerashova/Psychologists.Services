import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from "firebase/firestore";

const {VITE_API_KEY, VITE_AUTH_DOMAIN, VITE_DB_DOMAIN, VITE_PROJECT_ID, VITE_STORAGE_BUCKET, VITE_MESSAGING_SENDER_ID, VITE_APP_ID} = import.meta.env

const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  databaseURL: VITE_DB_DOMAIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  appId: VITE_APP_ID
};

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

// async function uploadData() {
//   const collectionRef = collection(db, "psychologists-services");

//   for (const psychologist of data) {
//     try {
//       const docRef = await addDoc(collectionRef, psychologist);
//       console.log(`Добавлен: ${psychologist.name}, ID: ${docRef.id}`);
//     } catch (e) {
//       console.error("Ошибка добавления:", e);
//     }
//   }
// }

// uploadData();
