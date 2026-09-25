import { View, Text, StyleSheet } from "react-native"
import { ProfileCard } from "../components/ProfileCards"
import { COLORS } from "../constans/theme"

export function ProfileScreen(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Mi perfil</Text>
            <ProfileCard 
                name="Ana Gomez" 
                role="Desarrolladora" 
                image=""
                isActive>
            </ProfileCard>
            <ProfileCard 
                name="Carlos Ruiz" 
                role="Doctor" 
                image=""
                isActive>
            </ProfileCard>
            <ProfileCard 
                name="Lucia Fernandez" 
                role="Product manager" 
                image=""
                isActive>
            </ProfileCard>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
  },
})