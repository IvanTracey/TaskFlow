import { View, Text, Image, TouchableOpacity,ActivityIndicator } from "react-native"
import { createStyles, useStyles} from '../constants/styles';
import Feather from '@expo/vector-icons/Feather';

type Props = {
  name: string;
  image: string | null;
  onChangeAvatar: () => void;
  loading: boolean;
}

export function ProfileCard ({name, image, onChangeAvatar, loading } : Props){
  const styles = useStyles();
  return(
    <View style={styles.cardUser}>
      { loading ? (
          <ActivityIndicator size="large" />
        ) : (
        image ? (
          <Image source={{ uri: image }} style={styles.avatar}/>
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