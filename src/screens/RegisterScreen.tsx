import { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { AuthStackParamList } from '../navigation/AuthStack';
import { COLORS, MARGIN, SIZE } from '../constants/theme';

type RegisterNavProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterNavProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [touchedConfirm, setTouchedConfirm] = useState(false);
  // Error que viene de Firebase (ej. email ya registrado) y se muestra en pantalla
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Funcion de validacion (Firebase exige al menos 6 caracteres en la contraseña)
  const validateForm = () => {
    return (
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
      password.length >= 6 &&
      confirm === password
    );
  };

  // Traduce el codigo de error de Firebase a un mensaje claro
  const getErrorMessage = (code?: string) => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Ya existe una cuenta con ese email.';
      case 'auth/invalid-email':
        return 'El email no tiene un formato válido.';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres.';
      case 'auth/network-request-failed':
        return 'Sin conexión. Revisa tu internet e intenta de nuevo.';
      default:
        return 'No pudimos crear la cuenta. Intenta de nuevo.';
    }
  };

  // Crea la cuenta en Firebase. Si sale bien no navegamos a mano:
  // el listener onAuthStateChanged detecta al usuario nuevo y pasa solo al flujo privado.
  const createAccount = async () => {
    setError('');
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
    } catch (e) {
      setError(getErrorMessage((e as { code?: string }).code));
    } finally {
      setLoading(false);
    }
  };

  // Funcion al presionar boton "Registrarme"
  const handleRegister = () => {
    setTouchedEmail(true);
    setTouchedPassword(true);
    setTouchedConfirm(true);

    if (validateForm()) {
      createAccount();
    }
  };

  const emailError = touchedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const passwordError = touchedPassword && password.length < 6;
  const confirmError = touchedConfirm && confirm !== password;

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>

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
        placeholder="Mínimo 6 caracteres"
        value={password}
        onChangeText={setPassword}
        onBlur={() => setTouchedPassword(true)}
        secureTextEntry
        autoCapitalize="none"
      />
      {passwordError && (
        <Text style={styles.error}>La contraseña debe tener al menos 6 caracteres.</Text>
      )}

      <Text style={styles.label}>Repetir contraseña</Text>
      <TextInput
        style={[styles.input, confirmError && styles.errorInput]}
        placeholder="Repite la contraseña"
        value={confirm}
        onChangeText={setConfirm}
        onBlur={() => setTouchedConfirm(true)}
        secureTextEntry
        autoCapitalize="none"
      />
      {confirmError && <Text style={styles.error}>Las contraseñas no coinciden.</Text>}

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Creando cuenta...' : 'Registrarme'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
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
