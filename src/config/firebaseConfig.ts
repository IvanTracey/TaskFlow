// src/config/firebaseConfig.ts
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Las claves NO se escriben en el codigo: viven en el archivo .env.local (ignorado por git).
// Expo solo reemplaza las variables si se acceden con notacion de punto (process.env.EXPO_PUBLIC_X).
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Si falta alguna variable, cortamos con un mensaje que dice exactamente que agregar
const missing = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missing.length > 0) {
  throw new Error(
    `Faltan variables de Firebase: ${missing.join(', ')}.\n` +
      'Crea el archivo .env.local en la raiz del proyecto con las lineas EXPO_PUBLIC_FIREBASE_* ' +
      '(API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID) ' +
      'y recarga la app.'
  );
}

// Con Fast Refresh este modulo puede ejecutarse mas de una vez: solo inicializamos la primera vez
const isFirstInit = getApps().length === 0;
const app = isFirstInit ? initializeApp(firebaseConfig) : getApp();

// initializeAuth con AsyncStorage hace que la sesion se guarde en el celular (persistencia)
export const auth = isFirstInit
  ? initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) })
  : getAuth(app);

export const db = getFirestore(app);
