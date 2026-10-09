import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Task } from '../constants/types';

type Props = {task: Task; onBack: () => void;};

export default function TaskDetail({ task, onBack }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>

      <Text style={styles.label}>Descripción</Text>
      <Text style={styles.text}>{task.description}</Text>
      
      <Text style={styles.label}>Categoría</Text>
      <Text style={styles.text}>{task.category}</Text>
      
      <Text style={styles.label}>Fecha</Text>
      <Text style={styles.text}>{task.createdAt.toLocaleDateString()}</Text>

      <TouchableOpacity style={styles.button} onPress={onBack}>
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'lightseagreen',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    alignSelf: 'center',
  },

  label: {
    fontWeight: 'bold',
    marginTop: 15,
  },

  text: {
    fontSize: 16,
    marginTop: 5,
  },

  button: {
    marginTop: 25,
    padding: 15,
    backgroundColor: 'darkcyan',
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },

  buttonText: {
    fontWeight: 'bold',
  },
});