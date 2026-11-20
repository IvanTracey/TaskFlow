import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { ThemeMode } from '../constants/theme';

// Guardamos la foto como string Base64 dentro del documento de Firestore
export const saveUserAvatar = async (
  uid: string, 
  base64Image: string
  ) : Promise <void> => {
  // Usamos setDoc con merge: true para no borrar otros datos que pueda tener el usuario
  await setDoc(
    doc(db, 'users', uid), 
    { avatarBase64: base64Image },
    { merge: true }
  );
};

// Recupera la foto del usuario
export const getUserAvatar = async (
  uid: string
  ) : Promise <string | null> => {
  const docSnap = await getDoc( doc(db, 'users', uid) );

  if (docSnap.exists()) {
    return docSnap.data().avatarBase64 || null;
  }
  return null;
};


// Guardar el modo seleccionado
export const saveUserTheme = async (
  uid: string,
  mode: ThemeMode
): Promise<void> => {
  await setDoc(
    doc(db, 'users', uid),
    { themeMode: mode },
    { merge: true }
  );
};

// Recuperar el modo guardado
export const getUserTheme = async (
  uid: string
): Promise<ThemeMode | null> => {

  const docSnap = await getDoc(doc(db, 'users', uid));

  if (docSnap.exists()) {
    const savedMode = docSnap.data().themeMode;

    if (savedMode === 'light' || savedMode === 'dark') {
      return savedMode;
    }
  }

  return null;
};