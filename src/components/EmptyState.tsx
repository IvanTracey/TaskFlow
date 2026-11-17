import { Text, View } from "react-native"
import { styles } from "../constants/styles"

export default function EmptyState() {
    return(
        <View style={styles.containerEmpty}>
            <Text style={styles.icon}>📋</Text>
            <Text style={styles.text}>¡No tienes tareas pendientes!</Text>
            <Text> Empieza por crear una.</Text>
        </View>
    )
}