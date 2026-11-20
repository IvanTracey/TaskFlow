import { View, Text, TouchableOpacity, Alert, Switch } from "react-native"
import { useCallback } from 'react';
import { useFocusEffect} from "@react-navigation/native";
import { useStyles} from '../constants/styles';
import { ProfileCard } from "../components/ProfileCards"
import { SafeAreaView  } from 'react-native-safe-area-context';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import useProfileImage  from "../hooks/useProfileImage";
import { useTheme } from "../hooks/useTheme";
import { setMode } from "../store/slices/themeSlice";
import { ThemeMode } from "../constants/theme";
import { saveUserTheme } from "../services/userService";

export function ProfileScreen(){
    const user = useAppSelector((state) => state.auth.user);
    // Nombre de la tarjeta: uso el mail ingresado
    const name = user?.email ?? "";    
    const { foto, guardarFoto, leerFoto, loadingFoto } = useProfileImage();

    // Determinacion del modo de la app
    const dispatch = useAppDispatch();
    const { mode, colors } = useTheme();
    const styles = useStyles();
    // Cuando se pone foco en esta screen, se lee la foto y actualiza
    useFocusEffect(
        useCallback( () => { leerFoto() }, [leerFoto] ) 
    );

    const handleThemeChange = async(isDark: boolean) => {
        const next: ThemeMode = isDark ? 'dark' : 'light';
        // Actualizamos Redux inmediatamente
        dispatch(setMode(next));
        // Guardamos la preferencia en Firestore
        if (user?.uid) {
            try {
                await saveUserTheme(user.uid, next);
            } catch (error) {
                Alert.alert(
                    'No se pudo guardar',
                    'El modo cambió, pero no pudimos guardar tu preferencia en la nube. Se conservará solamente durante esta sesión.'
                );
            }
        }
    };
    
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
                    onChangeAvatar={guardarFoto}
                    loading={loadingFoto} >
                </ProfileCard>
                <View style={styles.cardMode}>
                    <Text style={styles.text}>Modo oscuro</Text>
                    <Switch
                        value={mode === 'dark'}
                        onValueChange={handleThemeChange}
                        trackColor={{ false: colors.border, true: colors.accent }}
                        thumbColor={colors.surface}
                    />
                </View>
                
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

