import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Task } from '../constants/types';
import { COLORS, MARGIN, SIZE } from '../constants/theme';

type Props = {
  task: Task; 
  onBack: () => void;
  onToggle: () => void;
  onDelete: () => void;
};

export default function TaskDetail({ task, onBack, onToggle, onDelete  }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{task.title}</Text>

        {/* Mostramos el estado actual (completada / pendiente) */}
        <Text style={styles.label}>Estado</Text>
        <Text style={[styles.text, task.completed ? styles.done : styles.pending]}>
          {task.completed ? ' Completada' : ' Pendiente'}
        </Text>

        <Text style={styles.label}>Descripción</Text>
        <Text style={styles.text}>{task.description}</Text>
        
        <Text style={styles.label}>Categoría</Text>
        <Text style={styles.text}>{task.category}</Text>
        
        <Text style={styles.label}>Fecha</Text>
        <Text style={styles.text}>{new Date(task.createdAt).toLocaleDateString()}</Text>

        <TouchableOpacity style={styles.toggleButton} onPress={onToggle}>
          <Text style={styles.buttonText}>
            {task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
          </Text>
        </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.buttonText}>Eliminar tarea</Text>
          </TouchableOpacity>

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
// ✅ Estilos para marcar visualmente el estado
  done: { color: COLORS.success, fontWeight: 'bold' },
  pending: { color: COLORS.textLight, fontWeight: 'bold' },

  // ✅ Botón toggle (verde)
  toggleButton: {
    marginTop: MARGIN.marginM,
    backgroundColor: COLORS.success,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  // ✅ Botón delete (rojo)
  deleteButton: {
    marginTop: MARGIN.marginXS,
    backgroundColor: COLORS.danger,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  button: {
    marginTop: MARGIN.marginM,
    padding: MARGIN.marginS,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: SIZE.fontSmall,
  },
});