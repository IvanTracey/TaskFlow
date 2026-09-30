import { View, Text, StyleSheet } from "react-native"
import { COLORS } from "../constants/theme"

export function HomeScreen(){
  return (
    <View style={styles.container}>
        <Text style={styles.title}>HomeScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 20,
        alignSelf: 'center',
    },
})