import { View, Text, TouchableOpacity, Alert } from "react-native"
import { useState } from 'react';
import { styles } from "../constants/styles";
import { ProfileCard } from "../components/ProfileCards"
import { SafeAreaView  } from 'react-native-safe-area-context';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import * as ImagePicker from 'expo-image-picker';
import { setUserAvatar } from '../store/slices/authSlice';
import { saveUserAvatar } from '../services/userService';

export function ProfileScreen(){
    const user = useAppSelector((state) => state.auth.user);
    // Nombre de la tarjeta: la parte del email antes del @ (Firebase solo nos da el email)
    const name = user?.email?.split("@")[0] ?? "";
    
  const dispatch = useAppDispatch();
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    // 1. Pedir permisos (necesario en dispositivos reales)
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a tu galería para cambiar la foto.');
      return;
    }

    // 2. Abrir la galería
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Cuadrado para que quede bien el círculo
      quality: 0.5,   // Calidad media para no guardar un string Base64 gigante
      base64: true,   // ¡Clave! Esto nos da la imagen como string para Firestore
    });

  // 3. Manejar cancelación
    if (!result.canceled && result.assets[0].base64 && user) {
      setUploading(true);
      try {
        const base64String = `data:image/jpeg;base64,${result.assets[0].base64}`;
        
        // Guardar en Firestore
        await saveUserAvatar(user.uid, base64String);
        
        // Actualizar Redux para que la UI cambie al instante
        dispatch(setUserAvatar(base64String));
        
        Alert.alert('Éxito', 'Foto de perfil actualizada');
      } catch (error: any) {
        Alert.alert('Error', 'No se pudo guardar la foto: ' + error.message);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };
    return(
        <SafeAreaView  style={styles.container}>
            <View style={styles.log}>
                <Text style={styles.title}>Perfil</Text>
                <ProfileCard 
                    name={name}
                    role=" - "
                    image="https://static.wikia.nocookie.net/lossimpson/images/a/a8/Lisa.jpg/revision/latest/scale-to-width-down/128?cb=20131027072334&path-prefix=es"
                    isActive = {true}>
                </ProfileCard>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}