
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme  } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useAppSelector } from '../store/hooks';
import { useStyles } from '../constants/styles';
import { useTheme } from '../hooks/useTheme';
import AppNavigator from './AppNavigator'; // tus tabs con TasksStack
import AuthStack from './AuthStack';       // nuevo stack de Login/Register

export default function RootNavigator() {
  const { user, isLoading } = useAppSelector((s) => s.auth);
  const styles = useStyles();
  const { mode, colors } = useTheme();
// Mientras Firebase revisa la sesion guardada mostramos un cargando (evita ver el login un instante)
    if (isLoading) {
        return(
            <View style={styles.loading}>
                <ActivityIndicator style={styles.loadingIndicator} size="large" />
            </View>
        )
    }

    const base = mode === 'dark' ? DarkTheme : DefaultTheme;
    const navTheme = { 
      ...base, 
      colors: { 
        ...base.colors,
        primary: colors.accent, 
        background: colors.screen, 
        card: colors.surface,
        text: colors.text, 
        border: colors.border 
      } 
    };

    return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      {user ? <AppNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}
