import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Task } from '../constants/types';
import { COLORS, MARGIN, SIZE } from '../constants/theme';

type Props = {task: Task; onBack: () => void;};

export default function TaskDetail({ task, onBack }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: MARGIN.marginS,
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  card: {
    padding: MARGIN.marginS,
    margin: MARGIN.marginM,
    justifyContent: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SIZE.fontSmall,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: MARGIN.marginL,
    alignSelf: 'center',
  },

  label: {
    fontWeight: 'bold',
    marginTop: MARGIN.marginS,
  },

  text: {
    fontSize: SIZE.fontSmall,
    marginTop: 5,
  },

  button: {
    marginTop: MARGIN.marginM,
    padding: MARGIN.marginS,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: SIZE.fontSmall,
  },
});