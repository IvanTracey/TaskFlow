import { Text, View } from "react-native"
import { useStyles } from "../constants/styles"
import { useAppSelector } from "../store/hooks";
import { useTheme } from "../hooks/useTheme";

export default function EmptyState() {
    const { filter } = useAppSelector((state) => state.tasks);
    
    const { mode, colors } = useTheme();
    const styles = useStyles();
    return(
        <View style={styles.containerEmpty}>
            <Text style={styles.icon}>📋</Text>
            {filter === "all" ? 
                <>
                    <Text style={styles.text}>¡No hay ninguna tarea en la lista!</Text>
                    <Text style={styles.subtext}> Puedes crear tareas apretando en "+"</Text>
                </> :
            filter === "completed" ? 
                <>
                    <Text style={styles.text}>¡No hay tareas completadas!</Text>
                    <Text style={styles.subtext}> Ponte a realizarlas!</Text>
                </> :
                <> 
                    <Text style={styles.text}>¡No hay tareas pendientes!</Text> 
                    <Text style={styles.subtext}> Puedes crear tareas apretando en "+"</Text>
                </>
            }
        </View>
    )
}