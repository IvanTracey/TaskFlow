import { Text, StyleSheet, View } from "react-native"
import { COLORS, MARGIN, SIZE } from "../constants/theme";

export default function EmptyState() {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>No tenes tareas pendientes!</Text>
            <Text> Empieza por crear una tarea.</Text>
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 400,
    backgroundColor: 'lightseagreen',
  },

  text: {
    fontSize: SIZE.fontSmall,
    fontWeight: 'bold', 
  },
});