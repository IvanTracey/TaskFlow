import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { ProfileScreen } from "../screens/ProfileScreen";
import { COLORS } from "../constants/theme"
import TasksStack from "./TasksStack";

// Rutas del Tab raiz
export type RootTabParamList = {
    Home: undefined,
    Profile: undefined,
}

// Crea un navegador tipo Tab (Barra inferior)
const Tab = createBottomTabNavigator <RootTabParamList>()

export default function AppNavigator(){
    return(
        <NavigationContainer>
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
        </NavigationContainer>
    )
}