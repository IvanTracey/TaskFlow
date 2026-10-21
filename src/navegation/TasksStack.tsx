/* Archivo que establece la pila de navegacion */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import TaskDetailScreen from "../screens/TaskDetailScreen";
import TaskForm from "../components/TaskForm";
import { COLORS } from "../constants/theme";

// Se declaran los parametros y los tipos del stack
export type TasksStackParamList = {
    TaskList: undefined;
    // TaskDetail recibe los datos de la tarea seleccionada
    TaskDetail: {
        id: string,
        title: string,
        description: string,
        category: string,
        // Pasarlo como string para evitar warning de serializacion
        createdAt: string,
    };
    TaskForm: undefined
}

// Crea un navegador tipo Stack - conecto el navegador con el tipo declarado (TasksStackParamList)
const Stack = createNativeStackNavigator <TasksStackParamList>()

export default function TasksStack() {
    return(
        // Define el conjunto de pantallas y el comportamiento de la pila
        <Stack.Navigator
        initialRouteName="TaskList" // Pantalla inicial
        screenOptions={     // Configura opciones comunes a todas las pantallas
            // Las primeras llaves pertenecen a JSX y las segundas a un objeto
            {
            headerStyle: {backgroundColor: COLORS.primary},
            headerTitleStyle: { fontWeight: "bold" }
            }
        }>
            <Stack.Screen
                name = "TaskList"
                component = { HomeScreen }
                options={{ title: "Mis Tareas" }}
            />
            <Stack.Screen
                name = "TaskDetail"
                component = { TaskDetailScreen }
                options={{ title: "Detalle de tarea" }}
            />
            <Stack.Screen
                name = "TaskForm"
                component = { TaskForm }
                options={{ title: "Nueva tarea", presentation:"modal" }}
            />
        </Stack.Navigator>
    )
}