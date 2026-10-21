import { Text, StyleSheet, View } from "react-native"
import { COLORS, MARGIN, SIZE } from "../constants/theme";

export default function EmptyState() {
    return(
        <View style={styles.container}>
            <Text style={styles.icon}>📋</Text>
            <Text style={styles.text}>¡No tienes tareas pendientes!</Text>
            <Text> Empieza por crear una arriba.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: MARGIN.marginL*6,
  },
  icon: {
    fontSize: 50,
    paddingBottom: MARGIN.marginXS,
  },
  text: {
    fontSize: SIZE.fontMedium,
    fontWeight: 'bold', 
  },
});