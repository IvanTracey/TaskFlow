// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABxrYsws_Zy0XYjyIKNZOLpoKCkmd2hOE",
  authDomain: "taskflow-app-6eada.firebaseapp.com",
  projectId: "taskflow-app-6eada",
  storageBucket: "taskflow-app-6eada.firebasestorage.app",
  messagingSenderId: "584962800503",
  appId: "1:584962800503:web:ebcdc93ea32c64cef17f72"
};

let app;
// Verificamos si ya hay una app inicializada para evitar errores en Hot Reload
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}
// Exportamos las instancias de los servicios que usaremos
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;