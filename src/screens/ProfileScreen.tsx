import { View, Text, StyleSheet } from "react-native"
import { COLORS, MARGIN } from "../constants/theme"
import { ProfileCard } from "../components/ProfileCards"

export function ProfileScreen(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>TaskFlow</Text>
            <ProfileCard 
                name="Ana Gomez" 
                role="Desarrolladora" 
                image="https://static.wikia.nocookie.net/lossimpson/images/a/a8/Lisa.jpg/revision/latest/scale-to-width-down/128?cb=20131027072334&path-prefix=es"
                isActive = {true}>
            </ProfileCard>
            <ProfileCard 
                name="Carlos Ruiz" 
                role="Doctor" 
                image="https://static.wikia.nocookie.net/lossimpson/images/9/9b/Homer-simpson-1280x1024.jpg/revision/latest/top-crop/width/200/height/150?cb=20110106181429&path-prefix=es"
                isActive = {false}>
            </ProfileCard>
            <ProfileCard 
                name="Lucia Fernandez" 
                role="Product manager" 
                image="https://static.wikia.nocookie.net/lossimpson/images/a/a8/Lisa.jpg/revision/latest/scale-to-width-down/128?cb=20131027072334&path-prefix=es"
                isActive = {true}>
            </ProfileCard>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: MARGIN.marginContainer,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: MARGIN.marginTitle,
        alignSelf: 'center'
    },
})