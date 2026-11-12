import { View, Text, Image, StyleSheet } from "react-native"
import { COLORS, MARGIN, SIZE } from "../constants/theme"

type Props = {
    name: string;
    role: string;
    image: string;
    isActive: boolean;
}

export function ProfileCard ({name, role, image, isActive} : Props){
  return(
    <View style={styles.card}>
      <Image source={{uri: image}} style={styles.avatar}/>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.role}>{role}</Text>
      <View style={[styles.badge, isActive ? styles.active : styles.inactive]}>
          <Text style={styles.badgeText}> {isActive ? "Activo" : "Inactivo"}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: MARGIN.marginL,
    margin: MARGIN.marginM,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: COLORS.border,
    marginTop: MARGIN.marginS,
  },
  info: {
    marginTop: MARGIN.marginS,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
    name: {
      fontSize: SIZE.fontLarge,
      fontWeight: 'bold',
      color: COLORS.text,
      marginTop: MARGIN.marginS,
    },
    role: {
      fontSize: SIZE.fontMedium,
      color: COLORS.textLight,
      marginTop: MARGIN.marginS,
      alignSelf: 'center',
    },

  badge: {
    alignSelf: 'center',
    paddingHorizontal: MARGIN.marginS,
    paddingVertical: MARGIN.marginXS,
    borderRadius: 9,
    marginTop: MARGIN.marginXS,
  },
    badgeText: {
      fontSize: SIZE.fontSmall,
      fontWeight: 'bold',
    },
    active: {
      backgroundColor: COLORS.success,
    },
    inactive: {
      backgroundColor: COLORS.danger,
    },
})

