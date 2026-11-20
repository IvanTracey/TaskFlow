
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { store } from './src/store/store';
import { auth } from './src/config/firebaseConfig';
import { setSession, clearSession } from './src/store/slices/authSlice';
import RootNavigator from './src/navigation/RootNavigator';
import { setMode } from './src/store/slices/themeSlice';
import { getUserTheme } from './src/services/userService';

export default function App() {
  useEffect(() => {
    // Listener global de sesión.
    // - Se dispara al arrancar la app (recupera sesión persistida).
    // - Se dispara al hacer login (user con uid).
    // - Se dispara al hacer logout (user null).
    const unsubscribe = onAuthStateChanged(auth, async(firebaseUser) => {
      if (firebaseUser) {
         // Cada nuevo usuario comienza con el modo predeterminado
        store.dispatch(setMode('light'));
        try {
          // Recuperamos el tema correspondiente a su UID
          const savedMode = await getUserTheme(firebaseUser.uid);
          // Si existe una preferencia, actualizamos Redux
          if (savedMode) {
            store.dispatch(setMode(savedMode));
          }
        } catch (error) {
          console.error('Error recuperando el tema:', error);
        }

        // Actualizamos el estado de autenticación
        store.dispatch(setSession({
          user: { 
            uid: firebaseUser.uid, 
            email: firebaseUser.email 
          },
        }));
      } else {
        // No hay usuario conectado
        store.dispatch(setMode('light'));
        store.dispatch(clearSession());
      }
    });

    return unsubscribe;
  }, []);
  

  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}