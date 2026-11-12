
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from '../store/hooks';
import { COLORS } from '../constants/theme';
import AppNavigator from './AppNavigator'; // tus tabs con TasksStack
import AuthStack from './AuthStack';       // nuevo stack de Login/Register

export default function RootNavigator() {
  const { user, isLoading } = useAppSelector((s) => s.auth);

// Mientras Firebase revisa la sesion guardada mostramos un cargando (evita ver el login un instante)
    if (isLoading) {
        return(
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={COLORS.text} />
            </View>
        )
    }
  return (
    <NavigationContainer>
      {/*  Renderizado condicional: si no hay user, el árbol de tabs
          directamente NO EXISTE. Es imposible navegar a Home sin loguearse. */}
      {user ? <AppNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});