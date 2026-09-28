import { View, Text, StyleSheet } from "react-native"
import { COLORS } from "../constans/theme"

export function ProfileScreen(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>TaskFlow</Text>
            <Text style={styles.subtitle}>Checkpoint 1: Estructura Base</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    subtitle: {
        fontSize: 20,
        color: COLORS.text,
    },
})