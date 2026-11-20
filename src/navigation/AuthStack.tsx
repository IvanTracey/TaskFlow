/* Pila de navegacion publica: solo se ve si no hay sesion iniciada */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { useTheme } from "../hooks/useTheme";

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
}

const Stack = createNativeStackNavigator <AuthStackParamList>()
const { colors } = useTheme();

export default function AuthStack() {
    return(
        <Stack.Navigator
        initialRouteName="Login"
        screenOptions={
            {
            headerStyle: {backgroundColor: colors.screen},
            headerTitleStyle: { fontWeight: "bold" }
            }
        }>
            <Stack.Screen
                name = "Login"
                component = { LoginScreen }
                options={{ title: "Iniciar sesión" }}
            />
            <Stack.Screen
                name = "Register"
                component = { RegisterScreen }
                options={{ title: "Crear cuenta" }}
            />
        </Stack.Navigator>
    )
}
