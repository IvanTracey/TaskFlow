import { useState } from 'react';
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { AuthStackParamList } from '../navigation/AuthStack';
import { useStyles } from '../constants/styles';
import { emailRegex } from '../utils/validation';
import { useTheme } from "../hooks/useTheme"

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

  const { mode, colors } = useTheme();
  const styles = useStyles();
  // Funcion de validacion (Firebase exige al menos 6 caracteres en la contraseña)
  const validateForm = () => {
    return (
      emailRegex.test(email.trim()) &&
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

  const emailError = touchedEmail && !emailRegex.test(email.trim());
  const passwordError = touchedPassword && password.length < 6;
  const confirmError = touchedConfirm && confirm !== password;

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>

      <View style={styles.sector}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, emailError && styles.errorInput]}
          placeholder="tu@email.com"
          placeholderTextColor={colors.textMuted}
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
          placeholderTextColor={colors.textMuted}
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
          placeholderTextColor={colors.textMuted}
          value={confirm}
          onChangeText={setConfirm}
          onBlur={() => setTouchedConfirm(true)}
          secureTextEntry
          autoCapitalize="none"
        />
        {confirmError && <Text style={styles.error}>Las contraseñas no coinciden.</Text>}

        {error !== '' && <Text style={styles.error}>{error}</Text>}
      </View>

      <View style={styles.sector}>
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
      </View>
    </KeyboardAvoidingView>
  );
}
