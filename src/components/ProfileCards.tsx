import { View, Text, Image, TouchableOpacity,ActivityIndicator } from "react-native"
import { styles } from "../constants/styles";
import Feather from '@expo/vector-icons/Feather';
import { useAppSelector } from "../store/hooks";

type Props = {
  name: string;
  image: string | null;
  onChangeAvatar: () => void;
  loading: boolean;
}

export function ProfileCard ({name, image, onChangeAvatar, loading } : Props){

  return(
    <View style={styles.cardUser}>
      { loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
        image ? (
          <Image source={{ uri: image }}style={styles.avatar}/>
          ) : (
          <View style={styles.icon}>
            <Feather name="camera-off" size={32} color="black" />
          </View>
          )
        )
      }
      <Text style={styles.name}>{name}</Text>
      <TouchableOpacity onPress={onChangeAvatar}>
          <Text style={styles.linkText}>
            Cambiar el avatar
          </Text>
        </TouchableOpacity>
    </View>
  )
}