import { View, Text, TouchableOpacity, Alert } from "react-native"
import { styles } from "../constants/styles";
import { ProfileCard } from "../components/ProfileCards"
import { SafeAreaView  } from 'react-native-safe-area-context';
import { useAppSelector } from "../store/hooks";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

export function ProfileScreen(){
    const user = useAppSelector((state) => state.auth.user);
    // Nombre de la tarjeta: la parte del email antes del @ (Firebase solo nos da el email)
    const name = user?.email?.split("@")[0] ?? "";

    // Cierra la sesion en Firebase: el listener onAuthStateChanged vuelve solo al login
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch {
            Alert.alert("Error", "No pudimos cerrar la sesión. Intenta de nuevo.");
        }
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