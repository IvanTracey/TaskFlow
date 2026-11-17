import { useState, useCallback } from "react";
import * as ImagePicker from "expo-image-picker"
import { useAppSelector } from "../store/hooks";
import { Alert } from "react-native"
import { saveUserAvatar, getUserAvatar } from "../services/userService";

export default function useProfileImage() {
    // Cargo el usuario traido de Firestore
    const user = useAppSelector((s) => s.auth.user)

    const [foto, setFoto] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [loadingFoto, setLoadingFoto] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Selecciona una foto y la guarda
    const guardarFoto = async ()  => {
        // Chequea que haya una sesion iniciada
        if (!user) return ;
        try {
            setLoading(true);
            setError(null);
            
            // Pedir permisos (necesario en dispositivos reales)
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permissionResult.granted === false) {
                Alert.alert('Permiso requerido', 'Necesitamos acceso a tu galería.');
                return;
            }

            // Abrir la galeria
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect:[1, 1],
                quality:0.2,    // Calidad baja para no guardar un string gigante
                base64: true    //Esto nos da la imagen como string para Firestore
            })

            // Verificar la seccion
            if (result.canceled || !result.assets[0].base64) { return; }

            // Preparar la imagen
            const base64String = `data:image/jpeg;base64,${result.assets[0].base64}`

            // Guardar en Firestore
            await saveUserAvatar(user.uid, base64String);

            // Actualizar la imagen de la pantalla
            setFoto(base64String);
        } catch (error) {
            setError("No se pudo guardar la imagen")
            Alert.alert('Error', 'No se pudo guardar la imagen.');
        } finally{
            setLoading(false);
        }
    }
    
    const leerFoto = useCallback(async () => {
        if (!user){
            setLoadingFoto(false);
            return; 
        }
        try {
            setLoadingFoto(true);
            setLoading(true);
            setError(null);
            // El servicio devuelve la imagen o null
            const imagen = await getUserAvatar (user.uid);
            setFoto(imagen);
        } catch (error){
            setError("No se pudo cargar la foto")
        } finally{
            setLoading(false);
            setLoadingFoto(false);
        }
    }, [user?.uid])
 
    return {
        foto,
        guardarFoto,
        leerFoto, 
        loading,
        loadingFoto,
        error,
    };
}
