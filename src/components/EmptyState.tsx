import { Text, View } from "react-native"
import { styles } from "../constants/styles"
import { useAppSelector } from "../store/hooks";


export default function EmptyState() {
    const { filter } = useAppSelector((state) => state.tasks);
    
    return(
        <View style={styles.containerEmpty}>
            <Text style={styles.icon}>📋</Text>
            {filter === "all" ? 
                <>
                    <Text style={styles.text}>¡No hay ninguna tarea en la lista!</Text>
                    <Text> Puedes crear tareas apretando en "+"</Text>
                </> :
            filter === "completed" ? 
                <>
                    <Text style={styles.text}>¡No hay tareas completadas!</Text>
                    <Text> Ponte a realizarlas!</Text>
                </> :
                <> 
                    <Text style={styles.text}>¡No hay tareas pendientes!</Text> 
                    <Text> Puedes crear tareas apretando en "+"</Text>
                </>
            }
        </View>
    )
}