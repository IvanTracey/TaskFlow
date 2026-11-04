import { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { AuthStackParamList } from '../navigation/AuthStack';
import { COLORS, MARGIN, SIZE } from '../constants/theme';

type LoginNavProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginNavProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  // Error que viene de Firebase (ej. contraseña incorrecta) y se muestra en pantalla
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Funcion de validacion
  const validateForm = () => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) && password.length > 0;
  };

  // Traduce el codigo de error de Firebase a un mensaje claro
  const getErrorMessage = (code?: string) => {
    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Email o contraseña incorrectos.';
      case 'auth/invalid-email':
        return 'El email no tiene un formato válido.';
      case 'auth/too-many-requests':
        return 'Demasiados intentos. Espera un momento e intenta de nuevo.';
      case 'auth/network-request-failed':
        return 'Sin conexión. Revisa tu internet e intenta de nuevo.';
      default:
        return 'No pudimos iniciar sesión. Intenta de nuevo.';
    }
  };

  // Inicia sesion en Firebase. Si sale bien no navegamos a mano:
  // el listener onAuthStateChanged detecta al usuario y cambia el stack solo.
  const signIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (e) {
      setError(getErrorMessage((e as { code?: string }).code));
    } finally {
      setLoading(false);
    }
  };

  // Funcion al presionar boton "Ingresar"
  const handleLogin = () => {
    setTouchedEmail(true);
    setTouchedPassword(true);

    if (validateForm()) {
      signIn();
    }
  };

  const emailError = touchedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const passwordError = touchedPassword && password.length === 0;

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>TaskFlow</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, emailError && styles.errorInput]}
        placeholder="tu@email.com"
        value={email}
        onChangeText={setEmail}
        onBlur={() => setTouchedEmail(true)}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        returnKeyType="next"
      />
      {emailError && <Text style={styles.error}>Ingresa un email válido.</Text>}

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={[styles.input, passwordError && styles.errorInput]}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        onBlur={() => setTouchedPassword(true)}
        secureTextEntry
        autoCapitalize="none"
      />
      {passwordError && <Text style={styles.error}>Ingresa tu contraseña.</Text>}

      {/* Error de Firebase (credenciales incorrectas, sin conexión, etc.) */}
      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Ingresando...' : 'Ingresar'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: MARGIN.marginS,
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  title: {
    fontSize: 46,
    fontWeight: 'bold',
    marginBottom: 25,
    alignSelf: 'center',
  },
  label: {
    fontSize: SIZE.fontSmall,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.textLight,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: COLORS.card,
  },
  errorInput: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  button: {
    marginTop: MARGIN.marginS,
    padding: MARGIN.marginS,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: SIZE.fontSmall,
  },
  link: {
    marginTop: MARGIN.marginS,
    alignItems: 'center',
  },
  linkText: {
    fontSize: SIZE.fontSmall,
    fontWeight: 'bold',
  },
});
