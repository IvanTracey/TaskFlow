
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { store } from './src/store/store';
import { auth } from './src/config/firebaseConfig';
import { setSession, clearSession } from './src/store/slices/authSlice';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  useEffect(() => {
    // Listener global de sesión.
    // - Se dispara al arrancar la app (recupera sesión persistida).
    // - Se dispara al hacer login (user con uid).
    // - Se dispara al hacer logout (user null).
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        store.dispatch(setSession({
          user: { 
            uid: firebaseUser.uid, 
            email: firebaseUser.email 
          },
        }));
      } else {
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