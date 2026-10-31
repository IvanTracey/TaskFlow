import { Provider } from 'react-redux';
import { store } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/config/firebase';
import {setUser} from './src/store/slices/authSlice'
import { RootNavigator } from '@react-navigation/native';

export default function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>{
      if (user){
        store.dispatch(setUser({uid: user.uid, email: user.email}));
      }else{
        store.dispatch(setUser(null));
      }
    })
  })
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}