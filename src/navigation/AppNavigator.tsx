import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import { ProfileScreen } from "../screens/ProfileScreen";
import { COLORS } from "../constants/theme"
import TasksStack from "./TasksStack";
import AuthStack from "./AuthStack";
import { auth } from "../config/firebaseConfig";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearSession, setSession } from "../store/slices/authSlice";

// Rutas del Tab raiz
export type RootTabParamList = {
    Home: undefined,
    Profile: undefined,
}

// Crea un navegador tipo Tab (Barra inferior)
const Tab = createBottomTabNavigator <RootTabParamList>()

// Flujo privado: solo se ve con sesion iniciada
function PrivateTabs(){
    return(
        <Tab.Navigator
        // Route es el parametro para que sepa que icon usar
        screenOptions = { ( {route} ) => ({
            // No muestro este header porque lo proporciona cada Stack
            headerShown: false,
            // Dar color al pasar por encima
            tabBarActiveTintColor: COLORS.text,
            tabBarInactiveTintColor: COLORS.background,
            tabBarIcon: ({ color, size }) => {
            // Definimos el icono según la pestaña activa
                const iconName = route.name === "Home" ? "list-outline" : "person-outline";
                return <Ionicons name={iconName} size={size} color={color}/>
            }
        })
        }>
            <Tab.Screen
            name="Home"
            component={TasksStack}
            options={{title: "Inicio"}}
            />

            <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{title: "Perfil"}}
            />

        </Tab.Navigator>
    )
}

export default function AppNavigator(){
    const dispatch = useAppDispatch();
    const { user, isLoading } = useAppSelector((state) => state.auth);

    // Listener de sesion: Firebase avisa al abrir la app (si habia sesion guardada) y en cada login/logout
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const token = await firebaseUser.getIdToken();
                dispatch(setSession({
                    user: { uid: firebaseUser.uid, email: firebaseUser.email },
                    token,
                }));
            } else {
                dispatch(clearSession());
            }
        });
        // Al desmontar dejamos de escuchar
        return unsubscribe;
    }, [dispatch]);

    // Mientras Firebase revisa la sesion guardada mostramos un cargando (evita ver el login un instante)
    if (isLoading) {
        return(
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={COLORS.text} />
            </View>
        )
    }

    return(
        <NavigationContainer>
            {/* Con usuario: flujo privado. Sin usuario: login/registro */}
            {user ? <PrivateTabs /> : <AuthStack />}
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: COLORS.primary,
    },
})
