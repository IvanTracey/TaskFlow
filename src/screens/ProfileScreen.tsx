import { View, Text, TouchableOpacity, Alert } from "react-native"
import { useCallback } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "../constants/styles";
import { ProfileCard } from "../components/ProfileCards"
import { SafeAreaView  } from 'react-native-safe-area-context';
import { useAppSelector } from '../store/hooks';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import useProfileImage  from "../hooks/useProfileImage"

export function ProfileScreen(){
    const user = useAppSelector((state) => state.auth.user);
    // Nombre de la tarjeta: uso el mail ingresado
    const name = user?.email ?? "";    
    const { foto, guardarFoto, leerFoto, loading, error } = useProfileImage();

    

    // Cuando se pone foco en esta screen, se lee la foto y actualiza
    useFocusEffect(
        useCallback( () => { leerFoto() }, [leerFoto] ) 
    );
    // Cierra sesion
    const handleLogout = async () => {
        try{
        await signOut(auth);
    } catch{
            Alert.alert("Error al querer cerrar sesión")
        }
    };

    return(
        <SafeAreaView  style={styles.container}>
            <View style={styles.log}>
                <Text style={styles.title}>Perfil</Text>
                <ProfileCard 
                    name={name}
                    image={foto}
                    onChangeAvatar={guardarFoto} >
                </ProfileCard>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

